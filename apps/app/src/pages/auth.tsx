import { useRouter } from "next/router";
import Providers from "../components/auth/Providers";

const Auth = () => {
	const router = useRouter();

	// Handle redirect on authentication
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) router.push("/");
	// });

	return (
		<div className="m-auto mt-32 p-8 bg-lightbackground w-96 rounded-lg shadow-md">
			<Providers />
		</div>
	);
};

export default Auth;
