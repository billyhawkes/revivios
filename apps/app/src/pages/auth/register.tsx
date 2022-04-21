import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import ProviderButton, {
	ProviderType,
} from "../../components/auth/ProviderButton";
import Alert, { AlertType } from "../../components/common/Alert";
import { auth } from "../../services/firebase";

interface AuthInput {
	email: string;
	password: string;
}

const register = () => {
	const {
		setError,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthInput>();

	const router = useRouter();
	onAuthStateChanged(auth, (user) => {
		if (user) router.push("/");
	});

	const setAuth: SubmitHandler<AuthInput> = async ({ email, password }) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
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
		<div className="m-auto p-8 mt-[20vh] bg-lightbackground w-96 rounded-lg shadow-md">
			<div
				className={`flex mb-8 justify-between bg-background -m-8 font-semibold text-xl text-center`}
			>
				<Link href="/auth/login">
					<a className={"p-4 flex-grow rounded-t-lg"}>
						<h3>Log in</h3>
					</a>
				</Link>
				<div
					className={"p-4 flex-grow rounded-t-lg bg-lightbackground"}
				>
					<h3>Register</h3>
				</div>
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
					<Alert
						type={AlertType.Error}
						msg={`${errors.email.message}`}
					/>
				) : (
					errors.password && (
						<Alert
							type={AlertType.Error}
							msg={`${errors.password.message}`}
						/>
					)
				)}
			</form>
		</div>
	);
};

export default register;
