import { LoginForm } from "@/Components/auth/loginForm";
import { Form } from "@/Components/form/formLayout";
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
      <Form title="Login To Your Account" component={<LoginForm />} />
    </>
  );
};

export default Index;
