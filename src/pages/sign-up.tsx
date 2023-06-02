import { SignUpForm } from "@/Components/auth/signUpForm";
import { Form } from "@/Components/form/form";
const SignUp = () => {
  return <Form title="Create Account" component={<SignUpForm />} />;
};

export default SignUp;
