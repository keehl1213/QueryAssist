import { useState, createContext, useContext, useMemo } from 'react';
import { isAccessTokenExpired } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext<UserProps>({
	locale: 'zh-TW',
	setLocale: () => undefined,
	userData: undefined,
	globalLoading: false,
	setGlobalLoading: () => null,
	isLogin: () => false,
});

export const useUserStore = () => useContext(UserContext);

export const UserContextProvider = ({ children }: { children: any }) => {
	// const [userData, setUserData] = useState<UserInfoProps>();
	const [locale, setLocale] = useState(navigator.language || 'zh-TW');
	const [globalLoading, setGlobalLoading] = useState(false);
	// const setUserData = (d: any) => _setUserData({ ...(userData || {}), ...d });

	const getUserData = () => {
		let user: UserInfoProps | undefined;
		const userInfo = sessionStorage.getItem('userInfo');
		if (userInfo) {
			const data = jwtDecode(userInfo) as any;
			user = {
				name: data.name,
				email: data.email,
				roleId: data.roleId,
				id: data.id,
				employeeId: data.employeeId,
				region: data.region,
				useAI: data.useAI === '01' ? true : false,
				deptId: data.deptId,
			};
		}
		return user;
	};

	const userData = useMemo(() => {
		return getUserData();
	}, [sessionStorage.getItem('userInfo')]);

	const isLogin = () =>
		!!sessionStorage.getItem('azureAccessToken') && !isAccessTokenExpired();

	const value = useMemo(
		() => ({
			userData,
			// setUserData,
			globalLoading,
			setGlobalLoading,
			isLogin,
			locale,
			setLocale,
		}),
		[userData, globalLoading]
	);

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export default UserContextProvider;
