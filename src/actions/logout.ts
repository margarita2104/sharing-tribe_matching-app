"use server";

import { revalidatePath } from "next/cache";
import { signOut } from "../auth";

export const logout = async () => {
  revalidatePath("/");
  await signOut({
    redirectTo: "/auth/login",
  });
};
