import AuthSessionProvider from "~/components/auth/auth-session-wrapper";
import { NewVerificationForm } from "~/components/auth/new-verification-form";

const NewVerificationPage = () => {
  return (
    <AuthSessionProvider>
      <NewVerificationForm />
    </AuthSessionProvider>
  );
};

export default NewVerificationPage;
