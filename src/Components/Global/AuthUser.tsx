import React, { createContext, useState } from "react";

interface User {
	userName: string;
	email: string;
	password: string;
	_id: string;
	predict: any[];
}
interface ContextData {
	currentUser: User;
}

export const GlobalContext = createContext<ContextData>({
	currentUser: {
		userName: "",
		email: "",
		_id: "",
		password: "",
		predict: [],
	},
});

export const MainContext: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User>({} as User);

	React.useEffect(() => {
		if (window.localStorage.getItem("soccerUser")) {
			const myData = JSON.parse(
				window.localStorage.getItem("soccerUser") || "",
			);
			setCurrentUser(myData);
		}

		return;
	}, []);
	return (
		<GlobalContext.Provider
			value={{
				currentUser,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
