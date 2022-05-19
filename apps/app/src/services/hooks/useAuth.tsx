import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { User } from "../../types/user";

const authContext = createContext<any>(null);

export const ProvideAuth = ({ children }: any) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

type Login = {
	token: string;
	id: number;
	email: string;
};
export const useProvideAuth = () => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	const login = ({ token, id, email }: Login) => {
		setUser({ id, email });
		localStorage.setItem("access_token", `${token}`);
		router.push("today");
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("access_token");
		router.push("/auth");
	};

	return { user, login, logout };
};
