import { loginSchema } from "@/utils/Schemas";
import { sendAuthData } from "@/utils/SendData";
import { LoginDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/input";
import { Form } from "../form/form";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: LoginDataType) =>
    sendAuthData("users/login", "post", data);

  return (
      <Form
        name={""}
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonText={"Login"}
        isLogin={true}
      >
        <FormInput
          label={"Your email"}
          type={"email"}
          placeholder={"name@company.com"}
          register={register}
          name={"email"}
          errors={errors}
        />

        <FormInput
          label={"Your password"}
          type={"password"}
          placeholder={"••••••••"}
          register={register}
          name={"password"}
          errors={errors}
        />
      </Form>
  );
};
