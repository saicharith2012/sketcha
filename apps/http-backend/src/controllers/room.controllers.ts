import { RequestHandler } from "express";
import generateRoomCode from "../utils/generateRoomCode";
import { CreateRoomSchema } from "@repo/common/types";

export const createChatRoom: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const parsed = CreateRoomSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message);
    }

    const roomId = generateRoomCode(9);

    res.json({
      message: "new room created.",
      roomId,
    });
  } catch (error) {
    res.json({
      message:
        error instanceof Error ? error.message : "Error while creating room.",
    });
  }
};
