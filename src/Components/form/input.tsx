import { FormInputProps } from "@/utils/types";
import { TextInput } from "flowbite-react";
import { FC } from "react";

export const FormInput: FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  register,
  name,
  errors,
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <TextInput
      {...register(name, { required: true })}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
    />
    {errors[name] && <p>{errors[name].message}</p>}
  </div>
);
