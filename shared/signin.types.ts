import {z } from '../backend/node_modules/zod';

export const SigninReqSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
export const SigninResSchema = z.object({
    success: z.boolean(),
    error: z.string().optional(),
    data: z.object({
        username: z.string(),
        email: z.string().email(),
        accessToken: z.string(),
        refreshToken: z.string(),
    }).optional(),
});

export type SigninReq = z.infer<typeof SigninReqSchema>;
export type SigninRes = z.infer<typeof SigninResSchema>;

