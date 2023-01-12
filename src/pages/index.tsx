import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaChartLine } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-background to-lightbackground text-white">
        {/* Header */}
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
        {/* Hero section */}
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
        {/* Benefits section */}
        <section className="mt-20 flex max-w-screen-lg flex-col items-start px-4 sm:mt-32 sm:px-8">
          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 md:gap-6">
            <div className="flex flex-col items-center md:items-start">
              <FaChartLine size={30} />
              <h3 className="mt-4 text-2xl">Increased Motivation</h3>
              <p className="mt-4 text-center opacity-80 sm:mt-6 md:text-left">
                All base UI elements are made using Nested Symbols and shared
                styles that are logically with one another.
              </p>
            </div>
            <div className="mt-12 flex flex-col items-center md:mt-0 md:items-start">
              <FaChartLine size={30} />
              <h3 className="mt-4 text-2xl">Open Source</h3>
              <p className="mt-4 text-center opacity-80 sm:mt-6 md:text-left">
                All base UI elements are made using Nested Symbols and shared
                styles that are logically with one another.
              </p>
            </div>
            <div className="mt-12 flex flex-col items-center md:mt-0 md:items-start">
              <FaChartLine size={30} />
              <h3 className="mt-4 text-2xl">Productivity</h3>
              <p className="mt-4 text-center opacity-80 sm:mt-6 md:text-left">
                All base UI elements are made using Nested Symbols and shared
                styles that are logically with one another.
              </p>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="mt-20 flex w-full max-w-screen-lg flex-col px-4 sm:mt-32 sm:flex-row sm:px-8">
          <div className="flex h-80 items-center justify-center rounded-xl bg-background sm:mt-0 sm:w-[45%]">
            <p>Image of Calendar</p>
          </div>
          <div className="items-left mt-8 flex w-full flex-col justify-center sm:ml-10 sm:mt-0 sm:w-[55%]">
            <h4 className="mt-4 w-full text-center text-xl font-bold sm:mt-0 sm:text-left sm:text-2xl md:text-3xl">
              Fully built in calendar for all your planning needs.
            </h4>
            <p className="mt-6 text-center opacity-80 sm:mt-8 sm:text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys
            </p>
          </div>
        </section>
        <section className="mt-10 flex w-full max-w-screen-lg flex-col-reverse px-4 sm:mt-20 sm:flex-row sm:px-8">
          <div className="items-left mt-8 flex w-full flex-col justify-center sm:mr-10 sm:mt-0 sm:w-[55%]">
            <h4 className="mt-4 w-full text-center text-xl font-bold sm:mt-0 sm:text-left sm:text-2xl md:text-3xl">
              Fully built in calendar for all your planning needs.
            </h4>
            <p className="mt-6 text-center opacity-80 sm:mt-8 sm:text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys
            </p>
          </div>
          <div className="flex h-80 items-center justify-center rounded-xl bg-background sm:mt-0 sm:w-[45%]">
            <p>Image of Calendar</p>
          </div>
        </section>
        <footer className="mt-20 flex h-16 w-full bg-background px-4 sm:px-8">
          <div className="m-auto flex w-full max-w-screen-lg items-center justify-between">
            <p className="mt-1">© Billy Hawkes</p>
            <Link
              href="https://github.com/billyhawkes/revivios"
              target="_blank"
              className="mt-1 text-lg"
            >
              <FaGithub size={35} className="transition hover:opacity-80" />
            </Link>
            {/* TODO add terms of service */}
            <Link href="/" className="mt-1 hover:underline">
              Terms of service
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
