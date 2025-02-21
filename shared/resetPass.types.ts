import {z } from '../backend/node_modules/zod';

export const ResetPassReqSchema = z.object({
  token : z.string(),
  newPassword : z.string(),
});

export const ResetPassResSchema = z.object({
  success : z.boolean(),
  error : z.string().optional(),
  data : z.object({
    message : z.string(),
  }).optional(),
});


export type ResetPassReq = z.infer<typeof ResetPassReqSchema>;
export type ResetPassRes = z.infer<typeof ResetPassResSchema>;