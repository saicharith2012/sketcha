import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { fetchChat } from "../controllers/chat.controllers";

const router: ExpressRouter = Router();

router.get("/:roomId", authenticateUser, fetchChat);

export default router;
