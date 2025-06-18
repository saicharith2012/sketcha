import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email().min(5),
  username: z.string().min(3).max(20),
  password: z
    .string()
    .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/), {
      message:
        "Password must contain at least one uppercase, one lowercase, one special character, and one number",
    })
    .min(8),
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
