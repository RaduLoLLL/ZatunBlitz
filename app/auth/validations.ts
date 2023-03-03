import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string({
    required_error: "Câmpul nu poate fi gol",
    invalid_type_error: "Câmpul nu poate fi gol",
  })
  .min(8, { message: "Parola trebuie să conțină cel puțin 8 caractere" })
  .max(100)
  .transform((str) => str.trim())

export const name = z.string({
  required_error: "Câmpul nu poate fi gol",
  invalid_type_error: "Câmpul nu poate fi gol",
})

export const surname = z.string({
  required_error: "Câmpul nu poate fi gol",
  invalid_type_error: "Câmpul nu poate fi gol",
})

export const phone = z.string({
  required_error: "Câmpul nu poate fi gol",
  invalid_type_error: "Câmpul nu poate fi gol",
})

export const Signup = z.object({
  name,
  surname,
  phone,
  email,
  password,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Parolele nu corespund",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
