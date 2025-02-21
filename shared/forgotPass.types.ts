import {z } from '../backend/node_modules/zod';

export const ForgotPassReqSchema = z.object({
  email : z.string(),
});

export const ForgotPassResSchema = z.object({
  success : z.boolean(),
  error : z.string().optional(),
  data : z.object({
    message : z.string(),
  }).optional(),
});


export type ForgotPassReq = z.infer<typeof ForgotPassReqSchema>;
export type ForgotPassRes = z.infer<typeof ForgotPassResSchema>;