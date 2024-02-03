import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z
    .string()
    .email({ message: "Email is incorrect" })
    .max(64, { message: "Email must not exceed 64 charecters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must not exceed 64 characters" }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
