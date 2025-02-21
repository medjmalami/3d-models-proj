import { Request, Response } from "express";
import { refreshTokens, users } from "../../db/schema";
import { db } from "../../db/index";
import { sql } from "drizzle-orm";
import jwt from "jsonwebtoken";

// Define the JWT payload interface
interface JWTPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

const handleError = (res: Response, status: number, message: string) => {
    res.status(status).json({ success: false, error: message });
};

const logout = async (req: Request, res: Response) => {
    const { email } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        handleError(res, 401, "Missing Authorization header");
        return;
    }
    
    const refreshToken = authHeader.split(" ")[1];
    
    try {
        // Check if refresh token exists
        const [token] = await db
            .select()
            .from(refreshTokens)
            .where(sql`token = ${refreshToken}`)
            .limit(1);
            
        if (!token) {
             handleError(res, 401, "Refresh token not found");
             return;
        }
        
        // Check if refresh token is valid
        const refreshTokenValid = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JWTPayload;
        
        if (!refreshTokenValid) {
            handleError(res, 401, "Invalid refresh token");
            return;
        }

        
        // Get user ID from email
        const [user] = await db
            .select({ id: users.id })
            .from(users)
            .where(sql`email = ${email}`)
            .limit(1);
            
        if (!user) {
             handleError(res, 404, "User not found");
             return;
        }
        
        // Check if token belongs to user
        if (refreshTokenValid.id !== user.id) {
            handleError(res, 401, "Refresh token does not belong to the user");
            return;
        }
        
        // Delete refresh token
        await db
            .delete(refreshTokens)
            .where(sql`token = ${refreshToken}`);
            
        res.status(200).json({ success: true, data: {} });
        return
    } catch (error) {
        console.error('Logout error:', error);
        handleError(res, 500, "Server error");
        return  
    }
};

export default logout;