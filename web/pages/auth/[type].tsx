import type { NextPage } from "next";
import { onAuthStateChanged } from "@firebase/auth";
import React from "react";
import { useRouter } from "next/router";
import { auth } from "../../services/firebase";
import Link from "next/link";
import ProviderButton, {
	ProviderType,
} from "../../components/auth/ProviderButton";
import AuthForm, { AuthType } from "../../components/auth/AuthForm";

const Auth: NextPage = () => {
	const router = useRouter();
	const { type }: any = router.query;
	const authType = type === "register" ? AuthType.Register : AuthType.Signin;

	onAuthStateChanged(auth, (user) => {
		if (user) router.push("/app");
	});

	return (
		<div className="m-auto p-8 mt-[20vh] bg-lightbackground w-96 rounded-lg shadow-md">
			<div
				className={`flex mb-8 justify-between bg-background -m-8 font-semibold text-xl text-center`}
			>
				<Link href="/auth/signin">
					<a
						className={`p-4 flex-grow rounded-t-lg ${
							authType === AuthType.Signin && "bg-lightbackground"
						}`}
					>
						<h3>Sign In</h3>
					</a>
				</Link>
				<Link href="/auth/register">
					<a
						className={`p-4 flex-grow rounded-t-lg
					${authType === AuthType.Register && "bg-lightbackground"}
					`}
					>
						<h3>Register</h3>
					</a>
				</Link>
			</div>
			<div className="flex justify-between">
				<ProviderButton provider={ProviderType.Google} />
				<ProviderButton provider={ProviderType.Twitter} />
				<ProviderButton provider={ProviderType.Github} />
			</div>
			<div className="my-8 flex justify-between content-center">
				<hr className="w-20 h-px bg-white my-auto" />
				Or continue with
				<hr className="w-20 h-px bg-white my-auto" />
			</div>
			<AuthForm type={authType} />
		</div>
	);
};

export default Auth;
