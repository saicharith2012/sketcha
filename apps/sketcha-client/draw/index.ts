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

let existingShapes: Shape[] = [];

export default function initDraw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  let clicked = false;
  let startX: number;
  let startY: number;
  let width: number;
  let height: number;

  if (!ctx) {
    return;
  }

  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    existingShapes.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    });
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
