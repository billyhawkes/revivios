import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithRedirect,
	TwitterAuthProvider,
} from "firebase/auth";
import React from "react";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { auth } from "../../services/firebase";

interface Props {
	provider: ProviderType;
}

export enum ProviderType {
	Google,
	Twitter,
	Github,
}

const ProviderButton = ({ provider }: Props) => {
	const setAuthProvider = async (provider: ProviderType) => {
		try {
			switch (provider) {
				case ProviderType.Google:
					await signInWithRedirect(auth, new GoogleAuthProvider());
				case ProviderType.Twitter:
					await signInWithRedirect(auth, new TwitterAuthProvider());
				case ProviderType.Github:
					await signInWithRedirect(auth, new GithubAuthProvider());
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button
			className="py-2 px-8 h-10 bg-background rounded"
			onClick={() => setAuthProvider(provider)}
		>
			{(() => {
				switch (provider) {
					case ProviderType.Google:
						return <FaGoogle />;
					case ProviderType.Twitter:
						return <FaTwitter />;
					case ProviderType.Github:
						return <FaGithub />;
				}
			})()}
		</button>
	);
};

export default ProviderButton;
