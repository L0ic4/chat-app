import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(2, "Min 2 char")
    .max(64, "Max 64"),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Email invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(2, "Min 2 char")
    .max(64, "Max 64"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation required"),
  name: yup.string().required("Name is required"),
  bio: yup.string(),
});

export const createChannelSchema = yup.object().shape({
  name: yup.string().required("Channel name is required"),
  type: yup.string().oneOf(["public", "private"]).required(),
  members: yup
    .array()
    .default([])
    .of(yup.string())
    .required("Members are required"),
});

export const updateChannelSchema = yup.object().shape({
  members: yup.array().of(yup.string()).required("Members are required"),
});

export const SendMessageSchema = yup.object().shape({
  content: yup.string().required("Message is required"),
});

export const updateUserSchema = yup.object().shape({
  bio: yup.string().default(null).nullable().notRequired(),
  name: yup.string().default(null).nullable().notRequired(),
  oldPassword: yup.string().default(null).nullable().notRequired(),
  password: yup.string().default(null).nullable().notRequired(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
});
