import AuthSessionProvider from "~/components/auth/auth-session-wrapper";
import { NewPasswordForm } from "~/components/auth/new-password-form";

const NewPasswordPage = () => {
  return (
    <AuthSessionProvider>
      <NewPasswordForm />
    </AuthSessionProvider>
  );
};

export default NewPasswordPage;
