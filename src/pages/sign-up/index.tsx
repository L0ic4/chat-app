import { SignUpForm } from "@/Components/auth/signUpForm";
import { FormLayout } from "@/Components/form/formLayout";
import Head from "next/head";
const Index = () => {
  return (
    <>
      <Head>
        <title>REGISTER | Chat App</title>
        <meta name="description" content="Please register before login" />
      </Head>
      <FormLayout title="Create Account" component={<SignUpForm />} />
    </>
  );
};

export default Index;
