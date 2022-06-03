import Link from "next/link";

const Intro = () => {
	return (
		<section className="max-w-[50%] mt-24 p-4">
			<h1 className="text-7xl font-bold leading-normal">
				Your Life <span className="text-primary">Gamified.</span>
			</h1>
			<p className="opacity-80 leading-loose mb-12">
				Revivios is a new and upcoming productivity and life management tool that brings
				common video game tropes to life!
			</p>
			<Link href="https://github.com/billyhawkes/revivios">
				<a target="_blank" className="btn-ghost">
					View on Github
				</a>
			</Link>
		</section>
	);
};

export default Intro;
