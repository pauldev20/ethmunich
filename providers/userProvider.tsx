'use client';
import { createContext, useContext, useState } from "react";

/* --------------------------------- Context -------------------------------- */

export interface IUserContext {
	token?: string;
	mutateToken?: (token: string) => void;
}

export const UserContext = createContext<IUserContext>({});

/* ---------------------------------- Hook ---------------------------------- */

export function useUser() {
	return useContext(UserContext);
}

/* -------------------------------- Provider -------------------------------- */

export function UserProvider({children}: {children: React.ReactNode;}) {
	const [token, setToken] = useState<string | undefined>(undefined);

	const mutateToken = (token?: string) => {
		console.log(token);
		setToken(token);
	};

	return (
		<UserContext.Provider value={{token, mutateToken}}>
			{children}
		</UserContext.Provider>
	)
}
