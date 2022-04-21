import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import Providers from "../components/auth/Providers";
import Tabs from "../components/auth/Tabs";
import { auth } from "../services/firebase";

const Auth = () => {
	const router = useRouter();
	const [authType, setAuthType] = useState<"login" | "register">("login");

	// Handle redirect on authentication
	onAuthStateChanged(auth, (user) => {
		if (user) router.push("/");
	});

	return (
		<div className="m-auto p-8 mt-[15vh] bg-lightbackground w-96 rounded-lg shadow-md">
			<Tabs authType={authType} setAuthType={setAuthType} />
			<Providers />
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
