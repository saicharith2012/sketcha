import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import prisma from "@repo/db/client";

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

const users: User[] = [];

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    const decodedToken = jwt.verify(token as string, JWT_SECRET as string);

    const userId = (decodedToken as JwtPayload).userId;

    if (!userId) {
      throw new Error();
    }

    return userId;
  } catch (error) {
    return null;
  }
}

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  const userId = checkUser(token as string);

  if (!userId) {
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data.toString());

    if (parsedData.type === "join") {
      const user = users.find((user) => user.ws === ws);
      user?.rooms.push(parsedData.payload.roomId);
      // console.log(users);
    }

    if (parsedData.type === "leave") {
      const user = users.find((user) => user.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter(
        (room) => room !== parsedData.payload.roomId
      );
      // console.log(users);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.payload.roomId;
      const message = parsedData.payload.message;

      await prisma.chat.create({
        data: {
          message,
          userId,
          roomId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message,
                roomId,
              },
            })
          );
        }
      });
    }
  });
});

// allowing users to join multiple rooms at a time.
// types of messages

// {
//   type: "join",
//   payload: {
//     roomId: "32sfd324dsa1"
//   }
// }

// {
//  type: "leave",
//  payload: {
//   roomId: "fedf2343kjhf"
//  }
// }

// {
//   type: "chat",
//   payload: {
//     message: "hello",
//     roomId: "23fadf234ds"
//   }
// }
