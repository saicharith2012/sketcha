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
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      width = e.clientX - startX;
      height = e.clientY - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}
