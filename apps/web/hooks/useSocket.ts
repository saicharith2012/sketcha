"use client";
import { useEffect, useState } from "react";
import { websocketUrl } from "../config";

export default function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${websocketUrl}?token=${process.env.NEXT_PUBLIC_TEMPORARY_JWT}`
    );
    ws.onopen = () => {
      setSocket(ws);
      setLoading(false);
    };

    return () => {
      ws.close();
      setSocket(undefined);
      setLoading(true);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
