import { loginSchema } from "@/utils/Schemas";
import { sendAuthData } from "@/utils/SendData";
import { LoginDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../form/input";
import { Form } from "../form/form";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginDataType> = (data: LoginDataType) =>
    sendAuthData({
      endpoint: "users/login",
      method: "post",
      data: data,
      isToken: false,
    });

  return (
    <Form
      name="loginForm"
      onSubmitFunction={handleSubmit(onSubmit)}
      buttonText="Login"
      buttonClass="loginButton"
      isLogin={true}
    >
      <FormInput
        label="Your email"
        type="email"
        placeholder="name@company.com"
        register={register}
        name="email"
        errors={errors}
      />

      <FormInput
        label="Your password"
        type="password"
        placeholder="••••••••"
        register={register}
        name="password"
        errors={errors}
      />
    </Form>
  );
};
