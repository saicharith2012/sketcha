import { RequestHandler } from "express";
import generateRoomCode from "../utils/generateRoomCode";
import { CreateRoomSchema } from "@repo/common/types";
import prisma from "@repo/db/client";

export const createChatRoom: RequestHandler = async (req, res) => {
  try {
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0]?.message);
    }

    const { name } = parsedData.data;

    const room = await prisma.room.findFirst({
      where: {
        slug: name,
      },
    });

    if(room) {
      throw new Error("Room name already taken.")
    }

    const roomCode = generateRoomCode(12);

    const userId = req.userId;

    await prisma.room.create({
      data: {
        slug: name,
        adminId: userId as string,
        roomCode,
      },
    });

    res.json({
      message: "New room created.",
      roomCode,
    });
  } catch (error) {
    res.json({
      message:
        error instanceof Error ? error.message : "Error while creating room.",
    });
  }
};

export const getRoomDetails: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;

    const room = await prisma.room.findFirst({
      where: {
        slug,
      },
    });

    res.json({
      room,
      message: "Room details fetched succesfully",
    });

    if (!room) {
      throw new Error("Room does not exist.");
    }
  } catch (error) {
    res.json({
      message:
        error instanceof Error
          ? error.message
          : "Error while fetching room details.",
    });
  }
};
