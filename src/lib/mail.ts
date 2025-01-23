import { Resend } from "resend";
import ChangeEmailTemplate from "~/components/change-email-template";
import RegistrationEmailTemplate from "~/components/confirm-email-template";
import ResetPasswordTemplate from "~/components/reset-password-template";
import { db } from "~/server/db";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_APP_URL
    : "http://localhost:3000";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const user = await db.user.findUnique({ where: { email } });

  await resend.emails.send({
    from: "mail@app.sharingtribe.tech",
    to: email,
    subject: "Reset Your Sharing Tribe Password",
    react: ResetPasswordTemplate({
      confirmEmailLink: resetLink,
      name: user?.name ?? undefined,
    }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const user = await db.user.findUnique({ where: { email } });

  await resend.emails.send({
    from: "mail@app.sharingtribe.tech",
    to: email,
    subject: "Welcome to Sharing Tribe!",
    react: RegistrationEmailTemplate({
      confirmEmailLink: confirmLink,
      name: user?.name ?? undefined,
    }),
  });
};
export const sendVerificationEmailProfile = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${domain}/auth/new-verification-profile?token=${token}`;
  const user = await db.user.findUnique({ where: { email } });

  await resend.emails.send({
    from: "mail@app.sharingtribe.tech",
    to: email,
    subject: "Confirm Your New Email for Sharing Tribe",
    react: ChangeEmailTemplate({
      confirmEmailLink: confirmLink,
      name: user?.name ?? undefined,
    }),
  });
};
