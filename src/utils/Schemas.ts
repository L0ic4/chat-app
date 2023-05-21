import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2).max(120),
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Adresse e-mail invalide")
    .required("L'adresse e-mail est requise"),
  password: yup.string().required().min(2).max(120),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est requise"),
  name: yup.string().required("Le nom est requis"),
  bio: yup.string(),
});


export const channelSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  members : yup.string(),
})