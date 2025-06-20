import RoomCanvas from "@/components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: Promise<{
    roomId: number;
  }>;
}) {
  const roomId = (await params).roomId;

  return <RoomCanvas roomId={roomId} />;
}
