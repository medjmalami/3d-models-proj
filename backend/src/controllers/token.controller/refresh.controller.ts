import { Request, Response } from "express";
import { refreshTokens, users } from "../../db/schema";
import { db } from "../../db/index";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { RefreshRes } from "../../../../shared/refresh.types";
import { RefreshReqSchema } from "../../../../shared/refresh.types";

const handleError = (res: Response, status: number, message: string) => {
    res.status(status).json({ success: false, error: message });
};

export const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        handleError(res, 401, "Missing Authorization header");
        return;
    }
    const refreshToken = authHeader.split(" ")[1];

    try {
        // Validate the request body (though email is no longer needed)
        const validated = RefreshReqSchema.safeParse({ refreshToken });
        if (!validated.success) {
            handleError(res, 400, "Invalid request ");
            return;
        }

        // Verify the refresh token's validity (signature and expiration)
        let decoded: jwt.JwtPayload;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;
        } catch (error) {
            // Handle invalid/expired token
            handleError(res, 401, "Invalid or expired refresh token");
            return;
        }

        // Check if the token exists in the database
        const [token] = await db.select()
            .from(refreshTokens)
            .where(eq(refreshTokens.token, refreshToken))
            .limit(1);
        if (!token) {
            handleError(res, 401, "Refresh token revoked");
            return;
        }

        // Extract userId from the token and find the user
        const userId = decoded.userId;
        const [user] = await db.select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);
        if (!user) {
            handleError(res, 404, "User not found");
            return;
        }

        // Generate new tokens
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '1h' }
        );
        const newRefreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '7d' }
        );

        // Update the refresh token in the database
        await db.update(refreshTokens)
            .set({ token: newRefreshToken })
            .where(eq(refreshTokens.token, refreshToken));

        const response: RefreshRes = {
            success: true,
            data: {
                accessToken,
                refreshToken: newRefreshToken
            }
        };

        res.status(200).json(response);
        return
    } catch (error: any) {
        console.error("Refresh error:", error);
        handleError(res, 500, "Server error");
    }
};