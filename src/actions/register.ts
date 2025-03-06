"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "../server/db";
import { RegisterSchema } from "../schema/index";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "../lib/mail";
import { generateVerificationToken } from "../lib/tokens";
import { type JobRoleFamily } from "@prisma/client";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  discTest: string,
  selectedRole: JobRoleFamily | undefined,
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, firstName, lastName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  if (discTest && selectedRole) {
    await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        discTestResult: discTest,
        jobRoleFamily: selectedRole,
      },
    });
  } else {
    await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
      },
    });
  }

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
