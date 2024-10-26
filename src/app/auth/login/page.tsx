import AuthSessionProvider from "~/components/auth/auth-session-wrapper";
import { LoginForm } from "~/components/auth/login-form";

const LoginPage = () => {
  return (
    <AuthSessionProvider>
      <LoginForm />
    </AuthSessionProvider>
  );
};

export default LoginPage;
