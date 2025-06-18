import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export const signupUser: RequestHandler = async (req, res) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0]?.message);
    }

    const { email, username, password } = parsedData.data;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (user) {
      if (user.email === email) {
        throw new Error("Email already in use.");
      } else if (user.username === username) {
        throw new Error("Username already taken.");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
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
    const parsedData = SigninSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0]?.message);
    }
    const { username, password } = parsedData.data;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("User does not exist.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
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
