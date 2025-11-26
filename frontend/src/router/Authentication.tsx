import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PATH from './pathConstants';
import { useUserStore } from '@/store/useUserContext';
import { Loading } from '@/components/compose';
import { tokenRequest } from '@/utils/msalAuth';
import { useMsalStore } from '@/store/useMsalContext';
import { AuthenticationResult } from '@azure/msal-browser';
import { cookieSync, toggleNotification } from '@/utils/common';
import { azureCallback, azureCallOBO } from '@/requests/azureRequests';
import { jwtDecode } from 'jwt-decode';

const Authentication: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { globalLoading, setGlobalLoading } = useUserStore();
	const { instance } = useMsalStore();

	const redirectPage = () => {
		// 如果是從非登入頁面進入，登入後導回原本的頁面
		const keepUrl = sessionStorage.getItem('keepUrl');
		if (keepUrl) {
			navigate(keepUrl);
		} else if (location.pathname === PATH.LOGIN) {
			navigate(PATH.CHATROOM);
		}
	};

	const msalHandleLoginPromise = async () => {
		try {
			//授權碼取得token（重定向/:code)
			await instance?.initialize();
			const response = await instance?.handleRedirectPromise();
			//回調成功時處理使用者身分驗證的信息
			//如果有response代表是使用授權碼進來的
			if (response) {
				await handleAzureToken(response);
			} else {
				console.log('OAuthPage handleRedirectPromise response null');
				try {
					const ssoSilentResponse =
						await instance?.ssoSilent(tokenRequest);

					if (ssoSilentResponse) {
						await handleAzureToken(ssoSilentResponse);
					}
				} catch (error: any) {
					console.log(error.message, '==ssoSilent Error');
					navigate(PATH.LOGIN);
				}
			}
		} catch (error) {
			// 回調失敗時處理錯誤
			console.error(error, '==msalHandleLoginPromise');
		}
	};

	const handleAzureToken = async (response: AuthenticationResult) => {
		const { account } = response;
		try {
			sessionStorage.setItem('azureAccessToken', response.accessToken);
			// Decode JWT
			const data = jwtDecode(response.accessToken) as any;
			// 更新token取得時間，用來計算token是否過期
			sessionStorage.setItem('iat', data.iat);
			// 將使用者的帳戶設置為活躍帳戶，以便在後續的請求中自動使用該帳戶進行身份驗證和授權
			instance?.setActiveAccount(account);
			const userInfo = await azureCallOBO(response.accessToken);
			await azureCallback(
				userInfo.data.employeeId,
				userInfo.data.email,
				userInfo.data.name
			);

			const cookieObj = window.document.cookie
				.split(';')
				.map((item) => item.trim())
				.reduce<{ [key: string]: any }>((result, item) => {
					const [key, value] = item.split('=');
					result[key] = value;
					return result;
				}, {});

			if (cookieObj.userInfo) {
				cookieSync();
			}
			redirectPage();
		} catch (error: any) {
			navigate(PATH.LOGIN);
			toggleNotification({ key: '沒有Supply Source登入權限' }, error);
		}
	};

	const isUserLogin = async () => {
		try {
			// handleRedirectPromise結束後會重新redirect回同一頁login頁面導致同時執行兩次API，加入判斷如果目前有正在執行的則不觸發第二次
			if (!sessionStorage.getItem('loginprocess')) {
				sessionStorage.setItem('loginprocess', 'Y');
				setGlobalLoading(true);
				await msalHandleLoginPromise();
				setGlobalLoading(false);
			}
		} catch (err) {
			console.log(err);
		} finally {
			sessionStorage.removeItem('loginprocess');
		}
	};

	React.useEffect(() => {
		isUserLogin();
	}, []);

	return (
		<Loading spinning={globalLoading}>
			<Outlet />
		</Loading>
	);
};

export default Authentication;
