import { NextPage } from "next";
import React from "react";
import Title from "../components/common/Layout/Title";
import { useAuth } from "../services/hooks/useAuth";

const Settings: NextPage = () => {
	const { user, logout } = useAuth();

	return (
		<div>
			<Title name="Settings" />
			<h2 className="text-lg mb-3">Account</h2>
			{user && <p>Email: {user.email}</p>}
			<button onClick={() => logout()}>Logout</button>
		</div>
	);
};

export default Settings;
