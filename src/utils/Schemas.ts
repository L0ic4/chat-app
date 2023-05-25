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
  name: yup.string().required("Le nom du canal est requis"),
  type: yup
    .string()
    .oneOf(["public", "private"], "Le type du canal doit être public ou privé")
    .required("Le type du canal est requis"),
  members: yup
    .array()
    .of(yup.string())
    .required("Les membres du canal sont requis"),
});

export const updateUserSchema = yup.object().shape({
  name: yup.string().required("Le nom du canal est requis"),
  oldPassword: yup.string().required("L'encien mot de passe est requis"),
  password: yup.string().required("Le nouveau mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est requise"),
  bio: yup.string(),
});

export const updateChannelSchema = yup.object().shape({
  members: yup
    .array()
    .of(yup.string())
    .required("Les membres du canal sont requis"),
});
