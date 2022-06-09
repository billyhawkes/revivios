import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../../types/user";
import api from "../api/axios";

const authContext = createContext<any>(null);

export const ProvideAuth = ({ children }: any) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

/* FIND ONE */
const findUserRequest = async (): Promise<User> => {
	const res = await api.get("/user");
	const user: User = await res.data;
	return user;
};

/* UPDATE */
const updateUserRequest = async (newUser: User["name"]): Promise<User> => {
	const res = await api.put("/user", newUser);
	const user: User = await res.data;
	return user;
};

export const useProvideAuth = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	const findUser = useQuery("user", findUserRequest, {
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			setUser(data);
		},
	});

	const login = (token: string) => {
		// TODO: Have axios token
		localStorage.setItem("access_token", `${token}`);
		queryClient.invalidateQueries("user");
	};

	const logout = () => {
		router.push("/auth");
		setUser(null);
		localStorage.removeItem("access_token");
	};

	const update = useMutation(updateUserRequest, {
		onSuccess: (updatedUser) => {
			queryClient.setQueryData("user", updatedUser);
		},
	});

	return { user, login, logout, findUser, update };
};
