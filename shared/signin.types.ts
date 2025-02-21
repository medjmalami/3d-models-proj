import { z } from '../backend/node_modules/zod';

export const SigninReqSchema = z.object({
    username: z.string(),
    password: z.string(),
});
export const SigninResSchema = z.object({
    success: z.boolean(),
    error: z.string().optional(),
    data: z.object({
        accessToken: z.string(),
    }).optional(),
});

export type SigninReq = z.infer<typeof SigninReqSchema>;
export type SigninRes = z.infer<typeof SigninResSchema>;

