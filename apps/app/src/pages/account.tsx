import { signOut } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../services/firebase";

const account: NextPage = () => {
	const router = useRouter();
	const user = auth.currentUser;

	const logout = async () => {
		await signOut(auth);
		await router.push("/auth");
	};

	return (
		<div>
			email: {user?.email}
			<button
				onClick={() => {
					logout();
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default account;
