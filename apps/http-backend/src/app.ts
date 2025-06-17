import express from "express";
import userRouter from "./routes/user.routes";
import roomRouter from "./routes/room.routes";

const app: express.Express = express();

app.use(express.json());

app.use(express.urlencoded());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);

export { app };
