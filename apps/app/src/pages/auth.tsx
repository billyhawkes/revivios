import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
	return (
		<div className="flex justify-between">
			<div className="mx-auto mt-32 p-8 bg-lightbackground rounded-lg shadow-md">
				<button
					className="py-2 px-8 h-10 bg-background rounded hover:opacity-80"
					onClick={() => signIn("github", { callbackUrl: "/" })}
				>
					{<FaGithub />}
				</button>
			</div>
		</div>
	);
};

export default Auth;
