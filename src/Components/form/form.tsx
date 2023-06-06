import { Button } from "flowbite-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FormProps {
  name: string;
  onSubmitFunction: any;
  buttonText: string;
  buttonClass: string;
  isLogin?: boolean;
  isSignUp?: boolean;
  children: ReactNode;
}

export const Form = ({
  name,
  onSubmitFunction,
  buttonText,
  buttonClass,
  isLogin,
  isSignUp,
  children,
}: FormProps) => {
  return (
    <form
      name={name}
      onSubmit={onSubmitFunction}
      className="flex max-w-md flex-col gap-4"
    >
      {children}
      <Button type="submit" className={buttonClass}>
        {buttonText}
      </Button>
      {isLogin && (
        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="/sign-up/index"
            >
              Sign In
            </Link>
          </p>
        </div>
      )}
      {isSignUp && (
        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account ?{" "}
            <Link
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </form>
  );
};
