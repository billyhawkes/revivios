import { signOut } from "@firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Layout from "src/components/app/Layout";
import { auth } from "../../services/firebase";

const logout = async () => {
	await signOut(auth);
};

const App: NextPage = () => {
	const user = auth.currentUser;
	const router = useRouter();

	return (
		<Layout>
			<>
				email: {user?.email}
				<button
					onClick={() => {
						logout();
						router.push("/");
					}}
				>
					Sign out
				</button>
			</>
		</Layout>
	);
};

export default App;
