import { RequestHandler } from "express";
import generateRoomCode from "../utils/generateRoomCode";
import { CreateRoomSchema } from "@repo/common/types";
import prisma from "@repo/db/client";

export const createChatRoom: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const parsed = CreateRoomSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message);
    }

    const roomCode = generateRoomCode(9);

    const userId = req.userId;

    await prisma.room.create({
      data: {
        slug: name,
        adminId: userId as string,
        roomCode,
      },
    });

    res.json({
      message: "new room created.",
      roomCode,
    });
  } catch (error) {
    res.json({
      message:
        error instanceof Error ? error.message : "Error while creating room.",
    });
  }
};
