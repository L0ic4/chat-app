import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2).max(120),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2).max(120),
  name: yup.string().required(),
  bio: yup.string(),
});
