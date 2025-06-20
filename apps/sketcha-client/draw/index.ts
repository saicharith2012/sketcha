import { httpBackendUrl, temporaryJwt } from "@/config";
import axios from "axios";
type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: number,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  let existingShapes: Shape[] = await getExistingShapes(roomId);
  clearCanvas(canvas, ctx, existingShapes); //rendering shapes fetched from db right after load

  let clicked = false;
  let startX: number;
  let startY: number;
  let width: number;
  let height: number;

  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.payload.message);
      existingShapes.push(parsedShape);
      clearCanvas(canvas, ctx, existingShapes);
      // race condition: if a message comes while drawing something,
      // the shape currently being drawn would be cleared
      // since the canvas is being cleared.
    }
  };

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    };
    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: JSON.stringify(shape),
          roomId,
        },
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      width = e.clientX - startX;
      height = e.clientY - startY;
      clearCanvas(canvas, ctx, existingShapes);
      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function clearCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  existingShapes: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: number) {
  const response = await axios.get(`${httpBackendUrl}/chat/${roomId}`, {
    headers: {
      Authorization: `Bearer ${temporaryJwt}`,
    },
  });

  const chat = response.data.chat;

  const shapes = chat.map((m: { message: string }) => JSON.parse(m.message));

  return shapes;
}
