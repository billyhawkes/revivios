import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Account: NextPage = () => {
	const router = useRouter();

	const logout = async () => {
		// await signOut(auth);
		await router.push("/auth");
	};

	return (
		<div>
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

export default Account;
