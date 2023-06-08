import { LoginForm } from "@/Components/auth/loginForm";
import { FormLayout } from "@/Components/form/formLayout";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>LOGIN | Chat App</title>
        <meta
          name="description"
          content="Please login to use fully-featured chat App site."
        />
      </Head>
      <FormLayout title="Login To Your Account" component={<LoginForm />} />
    </>
  );
};

export default Index;
