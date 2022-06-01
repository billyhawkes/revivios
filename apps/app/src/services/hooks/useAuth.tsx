import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../../types/user";
import { client } from "../api/graphqlClient";

const authContext = createContext<any>(null);

export const ProvideAuth = ({ children }: any) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

/* FIND ONE */
const findUserGQL = gql`
	{
		user {
			id
			name
			email
			xp
		}
	}
`;
const findUserQuery = async (): Promise<User> => {
	const data = await client.request(findUserGQL);
	const user: User = await data.user;
	return user;
};

/* UPDATE */
const updateUserGQL = gql`
	mutation User($name: String!) {
		updateUser(updateUserInput: { name: $name }) {
			id
			name
			email
			xp
		}
	}
`;
const updateUserMutation = async (newUser: User["name"]): Promise<User> => {
	const data = await client.request(updateUserGQL, newUser);
	const user: User = await data.updateUser;
	return user;
};

export const useProvideAuth = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	const findUser = useQuery("user", findUserQuery, {
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			setUser(data);
		},
	});

	const login = (token: string) => {
		client.setHeader("authorization", `Bearer ${token}`);
		localStorage.setItem("access_token", `${token}`);
		queryClient.invalidateQueries("user");
	};

	const logout = () => {
		router.push("/auth");
		setUser(null);
		localStorage.removeItem("access_token");
	};

	const update = useMutation(updateUserMutation, {
		onSuccess: (updatedUser) => {
			queryClient.setQueryData("user", updatedUser);
		},
	});

	return { user, login, logout, findUser, update };
};
