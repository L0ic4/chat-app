import { LoginForm } from "@/Components/auth/loginForm";
import { Form } from "@/Components/form/formLayout";

const Login = () => {
  return <Form title="Login To Your Account" component={<LoginForm />} />;
};

export default Login;
