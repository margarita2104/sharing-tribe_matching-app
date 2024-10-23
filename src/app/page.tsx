import { auth } from "~/auth";

export default async function HomePage() {
  const session = await auth();
  console.log(session);
  return <main>Hello</main>;
}
