import { getUserDetails } from "@/api/API";
import { updateUserSchema } from "@/utils/Schemas";
import { sendAuthData } from "@/utils/SendData";
import { UserData, updateUserData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import React from "react";
import { useForm } from "react-hook-form";

export const EditProfileForm = ({ user }: { user: UserData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<updateUserData>({ resolver: yupResolver(updateUserSchema) });
  const onSubmit = (data: updateUserData) => {
    reset();
    sendAuthData("user", "put", data, true);
  };
  return (
    <form
      name="editProfileForm"
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </Label>
        <TextInput
          {...register("name", { required: true })}
          type="text"
          placeholder={user.user?.name}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <Label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </Label>
        <TextInput value={user.user?.email} disabled type="email" />
      </div>
      <div>
        <Label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Bio
        </Label>
        <Textarea
          {...register("bio")}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={user.user?.bio}
        ></Textarea>
      </div>
      <div>
        <Label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </Label>
        <TextInput
          type="password"
          {...register("oldPassword", { required: true })}
          placeholder="••••••••"
        />
        {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
      </div>
      <div>
        <Label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          New Password
        </Label>
        <TextInput
          {...register("password", { required: true })}
          placeholder="••••••••"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <Label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </Label>
        <TextInput
          {...register("confirmPassword", {
            required: true,
          })}
          type="password"
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <Button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Update Profile
      </Button>
    </form>
  );
};
