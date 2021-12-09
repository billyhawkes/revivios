import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../../service/firebase";

const logout = async () => {
	await signOut(auth);
};

const App = () => {
	const user = auth.currentUser;
	const router = useRouter();

	return (
		<div>
			email: {user?.email}
			<button
				onClick={() => {
					logout();
					router.push("/");
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default App;
