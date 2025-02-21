import { Router } from "express";
import  signin  from "../controllers/sign.controller/signin.controller";
import logout from "../controllers/sign.controller/logout.controller";
const router = Router();

router.post("/signin", signin );
router.post("/logout", logout );

export default router;