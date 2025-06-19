"use client";
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const { socket, loading } = useSocket();
  const newMessageRef = useRef<HTMLInputElement>(null);
  //   console.log(chats)

  useEffect(() => {
    // console.log(socket)
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: id
          }
        })
      );
      socket.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);

        if (parsedData.type === "chat") {
          if (parsedData.payload.roomId === id) {
            setChats((c) => [...c, { message: parsedData.payload.message }]);
          }
        }
      };
    }
  }, [socket, loading, id]);
  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index}>{chat.message}</div>
      ))}

      <input ref={newMessageRef} type="text" placeholder="message"></input>
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              payload: {
                roomId: id,
                message: newMessageRef.current?.value,
              },
            })
          );

          if (newMessageRef.current) {
            newMessageRef.current.value = "";
          }
        }}
      >
        send
      </button>
    </div>
  );
}
