import { auth } from "~/auth";

export default async function HomePage() {
  const user = await auth();
  console.log(user);
  return <main>Hello</main>;
}
