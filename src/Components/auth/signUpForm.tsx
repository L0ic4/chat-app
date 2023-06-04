import { signUpSchema } from "@/utils/Schemas";
import { sendAuthData } from "@/utils/SendData";
import { SigninDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../form/input";
import { Form } from "../form/form";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninDataType>({ resolver: yupResolver(signUpSchema) });

  const onSubmit: SubmitHandler<SigninDataType> = (data) =>
    sendAuthData("users", "post", data);
  return (
    <Form
      name={""}
      onSubmitFunction={handleSubmit(onSubmit)}
      buttonText={"Sign in"}
      isSignUp={true}
    >
      <FormInput
        label={"Your name"}
        type={"text"}
        placeholder={"John"}
        register={register}
        name={"name"}
        errors={errors}
      />
      <FormInput
        label={"Your email"}
        type={"email"}
        placeholder={"name@company.com"}
        register={register}
        name={"email"}
        errors={errors}
      />
      <FormInput
        label={"Password"}
        type={"password"}
        placeholder={"••••••••"}
        register={register}
        name={"password"}
        errors={errors}
      />
      <FormInput
        label={"Confirm Password"}
        type={"password"}
        placeholder={"••••••••"}
        register={register}
        name={"confirmPassword"}
        errors={errors}
      />
    </Form>
  );
};
