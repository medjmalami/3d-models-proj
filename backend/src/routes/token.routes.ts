import { Router } from "express";
import { refresh } from "../controllers/token.controller/refresh.controller";
const router = Router();

router.post("/refresh",refresh );

export default router;