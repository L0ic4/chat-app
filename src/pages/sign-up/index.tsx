import { SignUpForm } from "@/Components/auth/signUpForm";
import { Form } from "@/Components/form/formLayout";
import Head from "next/head";
const Index = () => {
  return (
     <>
       <Head>
         <title>REGISTER | Chat App</title>
         <meta name="description" content="Please register before login" />
       </Head>
       <Form title="Create Account" component={<SignUpForm />}/></>
  );
};

export default Index;
