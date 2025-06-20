"use client";
import { wsBackendUrl } from "@/config";
import CanvasComponent from "./Canvas";
import { useEffect, useState } from "react";

export default function RoomCanvas({ roomId }: { roomId: number }) {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${wsBackendUrl}?token=${process.env.NEXT_PUBLIC_TEMPORARY_JWT}`
    );
    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId,
          },
        })
      );
    };

    return () => {
      ws.close();
      setSocket(undefined);
    };
  }, []);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return <CanvasComponent roomId={roomId} socket={socket} />;
}
