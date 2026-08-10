import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3).max(25),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[a-z]/)
    .regex(/[^A-Za-z0-9]/),
});

const resetPasswordSchema = z.object({
  email: z.email(),
  token: z.string().regex(/^[a-fA-F0-9]{64}$/),
  newPassword: z
    .string()
    .min(8)
    .max(50)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[a-z]/)
    .regex(/[^A-Za-z0-9]/),
});

const emailSchema = z.object({
  email: z.email(),
});

export { userSchema, resetPasswordSchema, emailSchema };
