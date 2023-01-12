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
        <section className="mt-20 flex w-full max-w-screen-lg flex-col px-4 sm:mt-40 sm:flex-row sm:px-8">
          <div className="flex w-full flex-col items-start sm:mr-10 sm:w-[55%]">
            <h2 className="w-full text-center text-5xl font-bold sm:text-left sm:text-6xl md:text-7xl">
              Treat life
            </h2>
            <h2 className="mt-4 w-full text-center text-5xl font-bold sm:mt-6 sm:text-left sm:text-5xl md:text-6xl">
              like a <span className="text-primary">game</span>
            </h2>
            <h4 className="mt-6 text-center opacity-80 sm:mt-8 sm:text-left">
              Life is the best game out there. So why not level up yourself in
              Revivios by managing your time and completing everyday tasks just
              like a video game.
            </h4>
            <Link
              href="/"
              className="md:btn invisible h-0 w-0 md:visible md:mt-10 md:h-auto md:w-auto"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-8 flex h-32 items-center justify-center rounded-xl bg-lightbackground sm:mt-0 sm:h-auto sm:w-[45%]">
            <p>Image of character leveling up</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
