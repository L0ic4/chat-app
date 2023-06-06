import { createChannelSchema } from "@/utils/Schemas";
import { sendChannelData } from "@/utils/SendData";
import { ChannelDataType, UserListData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "flowbite-react";
import { FormInput } from "../form/input";
import { Form } from "../form/form";

export const CreateChannelForm = ({ users }: { users: UserListData }) => {
  const options = users.users.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChannelDataType>({
    resolver: yupResolver(createChannelSchema),
  });
  const onSubmit = (data: ChannelDataType) => {
    sendChannelData({
      endpoint: "channel",
      method: "post",
      data: data,
      isToken: true,
    });
  };
  // @ts-ignore
  return (
    <Form
      name="createChannelForm"
      onSubmitFunction={handleSubmit(onSubmit)}
      buttonText="Create Channel"
      buttonClass="createChannelButton"
    >
      <FormInput
        label="Channel Name"
        type="text"
        placeholder="Lo Reconsolidated"
        register={register}
        name="name" //TODO: change with channelName
        errors={errors}
      />
      <div>
        <Label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          value="Select an option"
        />
        <select
          {...register("type", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div>
        <Label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          value="Channel member"
        />
        <Controller
          name="members"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              // value={options.filter((c) => value?.includes(c.value))}
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val.map((c) => c.value))}
              options={options}
              isMulti
            />
          )}
          rules={{ required: true }}
        />
      </div>
    </Form>
  );
};
