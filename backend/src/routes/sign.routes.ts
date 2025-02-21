import { Router } from "express";
import  signin  from "../controllers/sign.controller/signin.controller";
const router = Router();

router.post("/signin", signin );

export default router;