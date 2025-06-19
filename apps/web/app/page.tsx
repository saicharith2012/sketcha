"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <input
        ref={roomIdRef}
        type="text"
        placeholder="Enter room id"
        className="p-2.5 m-2.5 border"
      ></input>
      <button
        className="py-2.5 px-5 cursor-pointer border"
        onClick={() => router.push(`/room/${roomIdRef.current?.value}`)}
      >
        Join
      </button>
    </div>
  );
}
