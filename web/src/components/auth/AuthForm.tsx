import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "@firebase/auth";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../services/firebase";
import Alert, { AlertType } from "../common/Alert";

interface AuthInput {
	email: string;
	password: string;
}

export enum AuthType {
	Register,
	Signin,
}

interface Props {
	type: AuthType;
}

const AuthForm = ({ type }: Props) => {
	const {
		setError,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthInput>();

	const setAuth: SubmitHandler<AuthInput> = async ({ email, password }) => {
		try {
			switch (type) {
				case AuthType.Register:
					await createUserWithEmailAndPassword(auth, email, password);
				case AuthType.Signin:
					await signInWithEmailAndPassword(auth, email, password);
			}
		} catch (err: any) {
			switch (err.code) {
				case "auth/wrong-password":
					setError("password", {
						type: "server",
						message: "Incorrect password.",
					});
				case "auth/invalid-email":
					setError("email", {
						type: "server",
						message: "Incorrect email address.",
					});
				case "auth/too-many-requests":
					setError("email", {
						type: "server",
						message: "Too many sign in attempts.",
					});
			}
			console.dir(err);
		}
	};

	return (
		<form className="flex flex-col" onSubmit={handleSubmit(setAuth)}>
			<label className="mb-2" htmlFor="email">
				Email Address
			</label>
			<input
				className="bg-background mb-8 h-10 p-2 rounded"
				{...register("email", {
					required: {
						value: true,
						message: "Email address is required",
					},
				})}
			/>
			<label className="mb-2" htmlFor="password">
				Password
			</label>
			<input
				className="bg-background mb-8 h-10 p-2 rounded"
				{...register("password", {
					required: {
						value: true,
						message: "Password is required",
					},
					minLength: {
						value: 8,
						message: "Password must be 8 or more characters",
					},
				})}
			/>
			<input
				className="bg-primary h-10 rounded cursor-pointer font-bold"
				type="submit"
			/>
			{errors.email ? (
				<Alert type={AlertType.Error} msg={`${errors.email.message}`} />
			) : (
				errors.password && (
					<Alert
						type={AlertType.Error}
						msg={`${errors.password.message}`}
					/>
				)
			)}
		</form>
	);
};

export default AuthForm;
