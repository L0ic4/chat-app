import { loginSchema } from "@/utils/Schemas";
import { sendAuthData } from "@/utils/SendData";
import { LoginDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label, TextInput, Button } from "flowbite-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: LoginDataType) =>
    sendAuthData("users/login", "post", data);

  return (
    <form
      name="loginForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <div className="mb-2 block">
        <Label htmlFor="email" value="Your email" />
        <TextInput
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            required: true,
          })}
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="mb-2 block">
        <Label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </Label>
        <TextInput
          {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Button type="submit">Login</Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet ?{" "}
        <Link
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          href="/sign-up"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};
