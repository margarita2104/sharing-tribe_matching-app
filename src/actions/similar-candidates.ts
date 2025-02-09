"use server";

import { db } from "~/server/db";

export async function similarCandidates(test: string) {
  const candidates = await db.user.findMany({
    where: { discTestResult: test },
  });

  return candidates;
}
