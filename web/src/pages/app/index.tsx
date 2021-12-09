import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../../service/firebase";

const useLogout = async () => {
	await signOut(auth);
};

const app = () => {
	const user = auth.currentUser;
	const router = useRouter();

	return (
		<div>
			email: {user?.email}
			<button
				onClick={() => {
					useLogout();
					router.push("/");
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default app;
