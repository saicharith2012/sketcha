import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { signinUser, signupUser } from "../controllers/user.controllers";

const router: ExpressRouter = Router();

router.post("/signup", signupUser)
router.post("/signin", signinUser)

export default router