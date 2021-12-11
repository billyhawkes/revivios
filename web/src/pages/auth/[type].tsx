import type { NextPage } from "next";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import {
	AuthProvider,
	createUserWithEmailAndPassword,
	TwitterAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "@firebase/auth";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { auth } from "../../service/firebase";
import Link from "next/link";

interface AuthInput {
	email: string;
	password: string;
}

const Auth: NextPage = () => {
	const { register, handleSubmit } = useForm<AuthInput>();
	const router = useRouter();
	const { type } = router.query;

	const setAuth: SubmitHandler<AuthInput> = async ({ email, password }) => {
		try {
			switch (type) {
				case "register":
					await createUserWithEmailAndPassword(auth, email, password);
				case "signin":
					await signInWithEmailAndPassword(auth, email, password);
				default:
					await router.push("/app");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const setProviderAuth = async (provider: AuthProvider) => {
		await signInWithPopup(auth, provider);
		await router.push("/app");
	};

	return (
		<div className="m-auto p-8 mt-24 bg-lightbackground w-96 rounded-lg shadow-md">
			<div className="flex mb-8 justify-between bg-background -m-8">
				{type === "signin" ? (
					<>
						<div className="p-4 text-center flex-grow bg-lightbackground rounded-t-lg">
							<h3 className="font-semibold text-xl">Sign In</h3>
						</div>
						<Link href="/auth/register">
							<a className="p-4 text-center flex-grow rounded-t-lg">
								<h3 className="font-semibold text-xl">
									Register
								</h3>
							</a>
						</Link>
					</>
				) : (
					<>
						<Link href="/auth/signin">
							<a className="p-4 text-center flex-grow rounded-t-lg">
								<h3 className="font-semibold text-xl">
									Sign In
								</h3>
							</a>
						</Link>
						<div className="p-4 text-center flex-grow bg-lightbackground rounded-t-lg">
							<h3 className="font-semibold text-xl">Register</h3>
						</div>
					</>
				)}
			</div>
			<div className="flex justify-between">
				<button
					className="py-2 px-8 h-10 bg-background rounded"
					onClick={() => setProviderAuth(new GoogleAuthProvider())}
				>
					<FaGoogle />
				</button>
				<button
					className="py-2 px-8 h-10 bg-background rounded"
					onClick={() => setProviderAuth(new TwitterAuthProvider())}
				>
					<FaTwitter />
				</button>
				<button
					className="py-2 px-8 h-10 bg-background rounded"
					onClick={() => setProviderAuth(new GithubAuthProvider())}
				>
					<FaGithub />
				</button>
			</div>
			<div className="my-8 flex justify-between content-center">
				<hr className="w-20 h-px bg-white my-auto" />
				Or continue with
				<hr className="w-20 h-px bg-white my-auto" />
			</div>
			<form className="flex flex-col" onSubmit={handleSubmit(setAuth)}>
				<label className="mb-2" htmlFor="email">
					Email Address
				</label>
				<input
					className="bg-background mb-8 h-10 p-2 rounded"
					{...register("email", { required: true })}
				/>
				<label className="mb-2" htmlFor="password">
					Password
				</label>
				<input
					className="bg-background mb-8 h-10 p-2 rounded"
					{...register("password", {
						required: true,
						minLength: 8,
					})}
				/>
				<input
					className="bg-primary h-10 rounded cursor-pointer font-bold"
					type="submit"
				/>
			</form>
		</div>
	);
};

export default Auth;
