import React, { useState, useMemo } from 'react';

interface GlobalContextType {
	userInfo?: UserInfoProps;
	setUserInfo: (s: UserInfoProps) => any;
	isLoading: boolean;
	setIsLoading: (s: boolean) => any;
}

export const GlobalContext = React.createContext<GlobalContextType>(
	{} as GlobalContextType
);

type AppcontextProps = {
	children?: React.ReactNode;
};

const AppContextProvider: React.FC<AppcontextProps> = ({ children }) => {
	const [userInfo, setUserInfo] = useState<UserInfoProps>();
	const [isLoading, setIsLoading] = useState(false);

	const value = useMemo(
		() => ({
			userInfo,
			setUserInfo,
			isLoading,
			setIsLoading,
		}),
		[userInfo, setUserInfo, isLoading, setIsLoading]
	);

	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	);
};

export default AppContextProvider;
