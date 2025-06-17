import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { createChatRoom } from "../controllers/room.controllers";

const router: ExpressRouter = Router();

router.post("/create-room", authenticateUser, createChatRoom);

export default router;
