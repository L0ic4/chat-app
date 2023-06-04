import { updateChannelSchema } from "@/utils/Schemas";
import { sendChannelData } from "@/utils/SendData";
import { CreateChannelPageProps, UpdateChannelData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { channel } from "diagnostics_channel";
import Select from "react-select";
import { useRouter } from "next/router";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "../form/form";

export const EditChannelForm = ({ users, channel }: CreateChannelPageProps) => {
  const rooter = useRouter();

  const options = users.users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const { handleSubmit, control } = useForm<UpdateChannelData>({
    resolver: yupResolver(updateChannelSchema),
  });
  const onSubmit = (data: UpdateChannelData) => {
    sendChannelData(`channels/${rooter.query.id}/members`, "post", data);
  };
  return (
    <Form
      name={""}
      onSubmitFunction={handleSubmit(onSubmit)}
      buttonText={"Save"}
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Channel name
        </label>
        <input
          value={channel?.channel?.name}
          disabled
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an option
        </label>
        <select
          disabled
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="private">{channel?.channel?.type}</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Channel member
        </label>
        <Controller
          name="members"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={options.filter((c) => value?.includes(c.value))}
              // value={options.find((c) => c.value === value)}
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
