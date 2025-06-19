import axios from "axios";
import { httpBackendUrl } from "../config";
import ChatRoomClient from "./ChatroomClient";

export default async function ChatRoom({ roomId }: { roomId: string }) {
  const { data } = await axios.get(`${httpBackendUrl}/chat/${roomId}`, {
    headers: {
      Authorization:`Bearer ${process.env.NEXT_PUBLIC_TEMPORARY_JWT}`,
    },
  });

  const messages = [...data.chat].reverse();
  return (
    <div>
      <ChatRoomClient messages={messages} id={roomId} />
    </div>
  );
}
