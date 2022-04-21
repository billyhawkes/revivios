type Props = {
	authType: "login" | "register";
	setAuthType: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

const Tabs = ({ authType, setAuthType }: Props) => {
	const active = "p-4 flex-grow rounded-t-lg bg-lightbackground";
	const notActive = "p-4 flex-grow rounded-t-lg cursor-pointer";

	return (
		<div
			className={`flex mb-8 justify-between bg-background -m-8 font-semibold text-xl text-center`}
		>
			<div
				className={`${authType === "login" ? active : notActive}`}
				onClick={() => setAuthType("login")}
			>
				<h3>Log in</h3>
			</div>
			<div
				className={`${authType === "register" ? active : notActive}`}
				onClick={() => setAuthType("register")}
			>
				<h3>Register</h3>
			</div>
		</div>
	);
};

export default Tabs;
