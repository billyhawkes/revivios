import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import Providers from "../components/auth/Providers";
import { auth } from "../services/firebase";

const Auth = () => {
	const router = useRouter();

	// Handle redirect on authentication
	onAuthStateChanged(auth, (user) => {
		if (user) router.push("/");
	});

	return (
		<div className="m-auto mt-32 p-8 bg-lightbackground w-96 rounded-lg shadow-md">
			<Providers />
		</div>
	);
};

export default Auth;
