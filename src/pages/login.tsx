import { LoginForm } from "@/Components/loginForm";
import { Form } from "@/Components/form";

const Login = () => {
  return <Form title="Login To Your Account" component={<LoginForm />} />;
};

export default Login;
