import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email().min(5),
  username: z.string().min(3).max(20),
  password: z
    .string()
    .regex(
      new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$/),
      "Password must contain atleast one uppercase, one lowercase, one digit and one speical character."
    )
    .min(8),
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
