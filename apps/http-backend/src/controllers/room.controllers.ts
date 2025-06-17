import { RequestHandler } from "express";
import generateRoomCode from "../utils/generateRoomCode";

export const createChatRoom: RequestHandler = async (req, res) => {
  const roomId = generateRoomCode(9);

  res.json({
    message: "new room created.",
    roomId,
  });
}