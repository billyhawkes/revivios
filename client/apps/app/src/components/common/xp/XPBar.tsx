import { useAuth } from "../../../services/hooks/useAuth";

const XPBar = () => {
	const { user } = useAuth();

	if (!user) {
		return <></>;
	}

	return (
		<footer className="fixed flex bottom-0 left-0 right-0 w-screen ml-10">
			<div className="w-full">
				<div
					className="bg-primary h-4 rounded-r-xl transition"
					style={{ width: `${user.xp}%` }}
				/>
			</div>
		</footer>
	);
};

export default XPBar;
