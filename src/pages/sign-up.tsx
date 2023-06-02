import { SignUpForm } from "@/Components/signUpForm";
import { Form } from "@/Components/form";
const SignUp = () => {
  return <Form title="Create Account" component={<SignUpForm />} />;
};

export default SignUp;
