import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
import { z } from '../../../node_modules/zod';

const SigninReqSchema = z.object({
    username: z.string(),
    password: z.string(),
});
const SigninResSchema = z.object({
    success: z.boolean(),
    error: z.string().optional(),
    data: z.object({
        accessToken: z.string(),
    }).optional(),
});

type SigninReq = z.infer<typeof SigninReqSchema>;
type SigninRes = z.infer<typeof SigninResSchema>;


// Helper function for error handling
const handleError = (res: Response, status: number, message: string) => {
   res.status(status).json({ success: false, error: message });
   
};


const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const r : SigninReq = {
    username,
    password,
  }
  
  try {
    // Validate required fields
    const validated = SigninReqSchema.safeParse(r);
    if (!validated.success) {
      handleError(res, 400, "Invalid request body");
      return
    }

    if (r.username === process.env.ADMIN_USERNAME && r.password === process.env.ADMIN_PASSWORD) {

          // Generate JWT token
      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '1h' }
      );



      const re : SigninRes = {
        success: true,
        data: {
          accessToken,
        }
      }
      res.status(201).json(re);
      return;
    }else{
      handleError(res, 401, "Invalid username or password");
      return;
    }




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