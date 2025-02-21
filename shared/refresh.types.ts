import {z } from '../backend/node_modules/zod';

export const RefreshReqSchema = z.object({
  refreshToken : z.string(),
});

export const RefreshResSchema = z.object({
  success : z.boolean(),
  error : z.string().optional(),
  data : z.object({
    accessToken : z.string(),
    refreshToken : z.string(),
  }).optional(),
});


export type RefreshReq = z.infer<typeof RefreshReqSchema>;
export type RefreshRes = z.infer<typeof RefreshResSchema>;
