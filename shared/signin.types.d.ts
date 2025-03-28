import { z } from '../backend/node_modules/zod';
export declare const SigninReqSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const SigninResSchema: z.ZodObject<{
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodObject<{
        accessToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accessToken: string;
    }, {
        accessToken: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: string | undefined;
    data?: {
        accessToken: string;
    } | undefined;
}, {
    success: boolean;
    error?: string | undefined;
    data?: {
        accessToken: string;
    } | undefined;
}>;
export type SigninReq = z.infer<typeof SigninReqSchema>;
export type SigninRes = z.infer<typeof SigninResSchema>;
