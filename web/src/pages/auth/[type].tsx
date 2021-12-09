import {
	AuthProvider,
	createUserWithEmailAndPassword,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "@firebase/auth";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { auth } from "../../service/firebase";

interface AuthInput {
	email: string;
	password: string;
}

const authPage = () => {
	const { register, handleSubmit } = useForm<AuthInput>();
	const router = useRouter();
	const { type } = router.query;
	console.log(type);

	const useAuth: SubmitHandler<AuthInput> = async ({ email, password }) => {
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

	const useProviderAuth = async (provider: AuthProvider) => {
		await signInWithPopup(auth, provider);
		await router.push("/app");
	};

	return (
		<div>
			<form onSubmit={handleSubmit(useAuth)}>
				<input
					placeholder="email"
					{...register("email", { required: true })}
				/>
				<input
					placeholder="password"
					{...register("password", {
						required: true,
						minLength: 8,
					})}
				/>
				<input type="submit" />
			</form>
			<button onClick={() => useProviderAuth(new GoogleAuthProvider())}>
				Google
			</button>
			<button onClick={() => useProviderAuth(new GithubAuthProvider())}>
				Github
			</button>
		</div>
	);
};

export default authPage;
