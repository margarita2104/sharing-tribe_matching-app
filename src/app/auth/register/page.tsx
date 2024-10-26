import AuthSessionProvider from "~/components/auth/auth-session-wrapper";
import { RegisterForm } from "~/components/auth/register-form";

const RegisterPage = () => {
  return (
    <AuthSessionProvider>
      <RegisterForm />
    </AuthSessionProvider>
  );
};

export default RegisterPage;
