import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

export const getServerSideProps = async () => {
	const providers = await getProviders();
	return {
		props: { providers },
	};
};

const SignIn = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<main className="flex items-center justify-center w-[100vw] h-[100vh]">
			<div className="bg-lightbackground p-8 pr-4 rounded flex justify-center items-center">
				{providers &&
					Object.values(providers).map((provider) => (
						<button
							onClick={() => signIn(provider.id, { callbackUrl: "/app/tasks/inbox" })}
							key={provider.name}
							className="border rounded bg-background mr-4 h-12 w-20 text-center flex justify-center items-center"
						>
							{provider.name === "Google" && <FaGoogle size={22} />}
							{provider.name === "GitHub" && <FaGithub size={22} />}
							{provider.name === "Discord" && <FaDiscord size={25} />}
						</button>
					))}
			</div>
		</main>
	);
};

export default SignIn;
