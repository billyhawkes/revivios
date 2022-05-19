import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "../services/auth/use-auth";

const Auth = () => {
	const router = useRouter();
	const { login } = useAuth();

	const getAuth = async () => {
		await router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github/callback`);
	};
	const { token, id, email } = router.query;

	useEffect(() => {
		if (token && id && email) {
			login({ token, id, email });
		}
	}, [router.isReady]);

	return (
		<div className="flex justify-between">
			<div className="mx-auto mt-32 p-8 bg-lightbackground rounded-lg shadow-md">
				<button
					className="py-2button px-8 h-10 bg-background rounded hover:opacity-80"
					onClick={() => getAuth()}
				>
					{<FaGithub />}
				</button>
			</div>
		</div>
	);
};

export default Auth;
