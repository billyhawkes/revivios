import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Settings: NextPage = () => {
	const { data: session } = useSession();
	return (
		<div>
			<h1 className="text-3xl">Settings</h1>
			<hr className="my-4 opacity-70" />
			<h2 className="text-lg mb-3">Account</h2>
			{session && session.user && (
				<>
					<p>Email: {session.user.email}</p>
					<p>Name: {session.user.name}</p>
					<p>{}</p>
					<button onClick={() => signOut({ callbackUrl: "/auth" })}>Sign out</button>
				</>
			)}
		</div>
	);
};

export default Settings;
