import * as msal from '@azure/msal-browser';

const APP_CLIENT_ID = import.meta.env.VITE_AAD_CLIENT_ID || '';
const AZURE_TENANT_ID = import.meta.env.VITE_AAD_TENANT_ID;

let redirectUri = window.location.href.split('/').slice(0, 3).join('/');
const startIdx1 = window.location.href.indexOf('#/');
// 短解: 因為同一頁驗證, MSAL回傳登入成功的網址回來之後會重導第二次導致網址更動, 針對code回來的網址重新取redirectUri
const startIdx2 = window.location.href.indexOf('code');
redirectUri =
	startIdx1 !== -1 ? redirectUri.substring(0, startIdx1) : redirectUri;
redirectUri =
	startIdx2 !== -1 ? redirectUri.substring(0, startIdx2 - 1) : redirectUri;

export const MsalConfig = {
	auth: {
		clientId: APP_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
		redirectUri,
		navigateToLoginRequestUrl: false,
	},
	cache: {
		cacheLocation: 'localStorage', // This configures where your cache will be stored
		storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
	},
	system: {
		loggerOptions: {
			loggerCallback: (level: any, message: any, containsPii: any) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case msal.LogLevel.Error:
						console.error(message);
						return;
					case msal.LogLevel.Info:
						console.info(message);
						return;
					case msal.LogLevel.Warning:
						console.warn(message);
						return;
					case msal.LogLevel.Verbose:
					default:
						console.debug(message);
						break;
				}
			},
		},
	},
};

export const loginRequest = {
	scopes: [`api://${APP_CLIENT_ID}/.default`],
};

export const tokenRequest = {
	scopes: [`api://${APP_CLIENT_ID}/.default`],
	forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
};
