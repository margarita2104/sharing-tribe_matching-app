import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";

export default async function Login() {
  const session = await getServerSession();
  if (!session)
    return (
      <div>
        <form
          action={async () => {
            "use server";
            await signIn("discord", { redirectTo: "/" });
          }}
        >
          <button type="submit">
            <button>login</button>
          </button>
        </form>
      </div>
    );
  return <div>Login</div>;
}
