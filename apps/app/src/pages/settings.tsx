import { NextPage } from "next";
import React from "react";
import { useAuth } from "../services/auth/use-auth";

const Settings: NextPage = () => {
	const { user, logout } = useAuth();

	return (
		<div>
			<h1 className="text-3xl">Settings</h1>
			<hr className="my-4 opacity-70" />
			<h2 className="text-lg mb-3">Account</h2>
			{user && <p>Email: {user.email}</p>}
			<button onClick={() => logout()}>Logout</button>
		</div>
	);
};

export default Settings;
