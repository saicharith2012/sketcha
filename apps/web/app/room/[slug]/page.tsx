import axios from "axios";
import { httpBackendUrl } from "../../../config";
import ChatRoom from "../../../components/Chatroom";

async function getRoom(slug: string) {
  const response = await axios.get(`${httpBackendUrl}/room/${slug}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMPORARY_JWT}`,
    },
  });

  return response.data.room.id;
}

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const roomId = await getRoom(slug);

  return (
    <div>
      <ChatRoom roomId={roomId} />
    </div>
  );
}
