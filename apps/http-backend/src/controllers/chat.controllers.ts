import { RequestHandler } from "express";
import prisma from "@repo/db/client";

export const fetchChat: RequestHandler = async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId || "");
    const chat = await prisma.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
      skip: 0,
      take: 50,
    });

    res.json({
      chat,
      message: "chat fetched successfully",
    });
  } catch (error) {
    res.json({
      message:
        error instanceof Error ? error.message : "Error while fetching chat.",
    });
  }
};
