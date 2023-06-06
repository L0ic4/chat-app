import { updateUserSchema } from "@/utils/Schemas";
import { updateProfile} from "@/utils/SendData";
import { UserData, UpdateUserData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label, TextInput, Textarea } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../form/form";
import { FormInput } from "../form/input";

export const EditProfileForm = ({ user }: { user: UserData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserData>({ resolver: yupResolver(updateUserSchema) });
  const onSubmit = (data: UpdateUserData) => {
    reset();
    updateProfile({ endpoint: "user", method: "put", data: data,isToken:true });//TODO; Mila token
  };
  return (
    <>
      <Form
        name="editProfileForm"
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonText="Update Index"
       buttonClass="updateProfileButton">
        <FormInput
          label="Your Name"
          type="text"
          placeholder={user.user?.name}
          register={register}
          name="name"
          errors={errors}
        />
        <div>
          <Label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </Label>
          <TextInput value={user.user?.email} disabled type="email" name="email" />
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
            name="bio"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={user.user?.bio}
          ></Textarea>
        </div>
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          register={register}
          name="oldPassword"//TODO: change to currentPassword
          errors={errors}
        />
        <FormInput
          label="New Password"
          type="password"
          placeholder="••••••••"
          register={register}
          name="password"//TODO: change to newPassword
          errors={errors}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          register={register}
          name="confirmPassword"
          errors={errors}
        />
      </Form>
    </>
  );
};
