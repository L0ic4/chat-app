import { Controller, useForm } from "react-hook-form";
import { ChannelData, ChannelDataType, UserListData } from "@/utils/types";
import { channelSchema } from "@/utils/Schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import requireAuth from "@/security/ProtectedRoute";
import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { sendChannelData } from "@/utils/SendData";
import { useRouter } from "next/router";

const Create = () => {
  const rooter = useRouter();
  const [donnees, setDonnees] = useState<UserListData>();
  const [Channel, SetChannel] = useState<ChannelData>();

  const token = Cookies.get("jetonJWT");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonnees(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/channel/${rooter.query.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        SetChannel(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
    fetchChannel();
  }, [rooter.query.id, token]);

  const options = (donnees?.users || []).map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const {handleSubmit, control } = useForm<ChannelDataType>({
    resolver: yupResolver(channelSchema),
  });
  const onSubmit = (data: ChannelDataType) => {
    sendChannelData("channel", "post", data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Chat-App
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create channel
            </h1>
            <form
              className="createChannelForm space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Channel name
                </label>
                <input
                  value={Channel?.channel?.name}
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
                  <option value="private">{Channel?.channel?.type}</option>
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
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default requireAuth(Create);
