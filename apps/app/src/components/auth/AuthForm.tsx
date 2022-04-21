import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "ui/Alert";
import { auth } from "../../services/firebase";

type FormInput = {
	email: string;
	password: string;
	repeatedPassword?: string;
};

type Props = {
	type: "register" | "login";
};

const AuthForm = ({ type }: Props) => {
	const {
		setError,
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormInput>();

	const password = useRef({});
	password.current = watch("password", "");

	const handleAuth: SubmitHandler<FormInput> = async ({
		email,
		password,
	}) => {
		try {
			if (type === "register") {
				await createUserWithEmailAndPassword(auth, email, password);
			} else if (type === "login") {
				await signInWithEmailAndPassword(auth, email, password);
			}
		} catch (err: any) {
			switch (err.code) {
				case "auth/wrong-password":
					setError("password", {
						type: "user",
						message: "Incorrect password.",
					});
				case "auth/invalid-email":
					setError("email", {
						type: "user",
						message: "Incorrect email.",
					});
				case "auth/too-many-requests":
					setError("email", {
						type: "user",
						message: "Too many attempts.",
					});
			}
		}
	};

	return (
		<form className="flex flex-col" onSubmit={handleSubmit(handleAuth)}>
			{errors.email ? (
				<Alert type={"error"} msg={`${errors.email.message}`} />
			) : errors.password ? (
				<Alert type={"error"} msg={`${errors.password.message}`} />
			) : (
				errors.repeatedPassword && (
					<Alert
						type={"error"}
						msg={`${errors.repeatedPassword.message}`}
					/>
				)
			)}
			<label className="mb-2" htmlFor="email">
				Email address
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
						message: "Password is required.",
					},
					minLength: {
						value: 8,
						message: "Password must be at least 8 characters.",
					},
				})}
			/>
			{type === "register" && (
				<>
					<label className="mb-2" htmlFor="repeated-password">
						Repeat password
					</label>
					<input
						className="bg-background mb-8 h-10 p-2 rounded"
						{...register("repeatedPassword", {
							required: {
								value: true,
								message: "Please repeat your password.",
							},
							validate: (value) =>
								value === password.current ||
								"The passwords do not match.",
						})}
					/>
				</>
			)}
			<input
				className="bg-primary h-10 rounded cursor-pointer font-bold"
				type="submit"
			/>
		</form>
	);
};

export default AuthForm;
