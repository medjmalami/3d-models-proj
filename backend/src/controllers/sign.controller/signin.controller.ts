import { Request, Response } from "express";
import { users } from "../../db/schema";
import { db } from "../../db/index";
import jwt from "jsonwebtoken";
import { SigninReq } from "../../../../shared/signin.types"
import { sql } from "drizzle-orm";
import { refreshTokens } from "../../db/schema";
import bcrypt from "bcrypt";
import { SigninRes } from "../../../../shared/signin.types";
import { SigninReqSchema } from "../../../../shared/signin.types";

// Helper function for error handling
const handleError = (res: Response, status: number, message: string) => {
   res.status(status).json({ success: false, error: message });
   
};



const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const r : SigninReq = {
    email,
    password,
  }
  
  try {
    // Validate required fields
    const validated = SigninReqSchema.safeParse(r);
    if (!validated.success) {
      handleError(res, 400, "Invalid request body");
      return
    }



    // Check if user exists
    let [user] = await db.select().from(users).where(sql`email = ${email}`).limit(1);
    if (!user) {
      handleError(res, 404, "User not found");
      return;
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      handleError(res, 401, "Incorrect password");
      return;
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '7d' }
    );

    await db.insert(refreshTokens).values({
      token : refreshToken,
    });

    const re : SigninRes = {
      success: true,
      data: {
        username: user.username,
        email: user.email,
        accessToken,
        refreshToken
      }
    }
    res.status(201).json(re);
    return;

  } catch (error: any) {
    // Handle unique constraint violations
    if (error.code === '23505') {
       handleError(res, 409, "Username or email already exists");
       return;
    }
    handleError(res, 500, "Server error");
    return;
  }
};

export default signin;