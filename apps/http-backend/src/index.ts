import express from "express";

const app = express();

app.get("/read", async (req, res) => {
  res.json({
    message: "hi there",
  });
});

app.listen(3001);
