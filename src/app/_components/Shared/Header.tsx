import Image from "next/image";
import Link from "next/link";


const Header = () => {
  return (
    <header className="bg-violet text-tree-poppy flex items-center justify-between py-2 px-7">
      <Link href="/">
        <Image src={"logo.svg"} alt="Sharing Tribe logo" width="180" height="64"/>
      </Link>
      <nav className="flex w-2/4 justify-around">
        <Link
          className=" border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          href="/"
        >
          Home
        </Link>
        <Link
          className="border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          href="https://sharingtribe.tech"
        >
          Sharing Tribe
        </Link>
        <Link
          className="border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          href="/disctest"
        >
          DISC Personality Test
        </Link>
      </nav>
      <div className="flex justify-center items-center gap-7">
        <Link
          className="border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          href="/signin"
        >
          Sign in
        </Link>
        <Link
          className="bg-tree-poppy text-violet py-2 px-5 rounded-2xl hover:bg-flush-orange"
          href="/join"
        >
          Join
        </Link>
      </div>
    </header>
  );
};

export default Header;