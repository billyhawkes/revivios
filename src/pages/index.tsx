import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-background to-lightbackground text-white">
        <header className="flex h-20 w-full max-w-screen-xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center justify-center ">
            <Image
              src="/logo.svg"
              alt="Logo of Revivios. A teal plus symbol."
              width={40}
              height={40}
            />
            <h3 className="invisible ml-4 mt-2 w-0 text-2xl font-bold sm:visible sm:w-auto">
              REVIVIOS
            </h3>
          </Link>
          <nav className="flex items-center justify-center">
            <Link
              href="https://github.com/billyhawkes/revivios"
              target="_blank"
              className="mt-1 text-lg"
            >
              <FaGithub size={40} className="transition hover:opacity-80" />
            </Link>
            <Link href="/" className="btn ml-4">
              Get Started
            </Link>
          </nav>
        </header>
      </main>
    </>
  );
};

export default Home;
