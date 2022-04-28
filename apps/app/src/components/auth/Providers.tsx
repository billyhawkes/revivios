import React from "react";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

type ProviderType = {
	icon: JSX.Element;
	provider: any;
};

// export const providers: ProviderType[] = [
// 	{
// 		icon: <FaGoogle />,
// 		provider: new GoogleAuthProvider(),
// 	},
// 	{
// 		icon: <FaTwitter />,
// 		provider: new TwitterAuthProvider(),
// 	},
// 	{
// 		icon: <FaGithub />,
// 		provider: new GithubAuthProvider(),
// 	},
// ];

const Providers = () => {
	return (
		<div className="flex justify-between">
			{/* {providers.map((provider: ProviderType, index: number) => (
				<button
					className="py-2 px-8 h-10 bg-background rounded hover:opacity-80"
					key={index}
					onClick={() => signInWithRedirect(auth, provider.provider)}
				>
					{provider.icon}
				</button>
			))} */}
		</div>
	);
};

export default Providers;
