import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import prisma from "@repo/db/client";

export const signupUser: RequestHandler = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const parsed = CreateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message);
    }

    await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    res.json({
      message: "You have signed up.",
    });
  } catch (error) {
    res.json({
      message:
        error instanceof Error ? error.message : "Error while signing up.",
    });
  }
};

export const signinUser: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const parsed = SigninSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message);
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      JWT_SECRET as string
    );

    res.json({
      message: "You are signed in.",
      token,
    });
  } catch (error) {
    res.json({
      message:
        error instanceof Error
          ? `Error: ${error.message}`
          : "Error while signing in.",
    });
  }
};
