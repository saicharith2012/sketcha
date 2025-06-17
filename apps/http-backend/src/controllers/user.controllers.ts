import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { env } from "../config";

export const signupUser: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  res.json({
    message: "You have signed up.",
  });
};

export const signinUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const userId = 1;

  const token = jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET
  );

  res.json({
    message: "You are signed in.",
    token,
  });
};
