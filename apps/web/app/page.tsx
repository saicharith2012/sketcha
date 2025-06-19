"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <input
        ref={roomIdRef}
        type="text"
        placeholder="Enter room id"
        style={{ padding: "10px" }}
      ></input>
      <button
        style={{ padding: "10px", cursor: "pointer" }}
        onClick={() => router.push(`/room/${roomIdRef.current?.value}`)}
      >
        Join
      </button>
    </div>
  );
}
