import { signUpSchema } from "@/utils/Schemas";
import { sendAuthData } from "@/utils/SendData";
import { SigninDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label, TextInput, Button } from "flowbite-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SigninDataType>({ resolver: yupResolver(signUpSchema) });
    
      const onSubmit: SubmitHandler<SigninDataType> = (data) =>
        sendAuthData("users", "post", data);
  return (
    <form
      name="registrationForm"
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="name" value="Your name" />
        <TextInput
          {...register("name", { required: true })}
          type="text"
          placeholder="John"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Your email</label>
        <TextInput
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            required: true,
          })}
          type="email"
          placeholder="name@company.com"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <TextInput
          {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label htmlFor="password">Confirm Password</label>
        <TextInput
          {...register("confirmPassword", {
            required: true,
          })}
          type="password"
          placeholder="••••••••"
        />
      </div>
      <Button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account ?{" "}
        <Link
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
};
