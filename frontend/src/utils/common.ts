import { notification } from 'antd';
import * as FUNCTIONS from './functions';

export { FUNCTIONS };

// 宣告一個函式 isAccessTokenExpired，用來檢查存儲在本地端的 token 是否已過期
export const isAccessTokenExpired = () => {
	// 從 sessionStorage 中取出 token 的發行時間 iat
	const iat = sessionStorage.getItem('iat')
		? Number(sessionStorage.getItem('iat'))
		: 0;
	// 取得當前時間，單位為秒
	const now = Math.round(new Date().getTime() / 1000);
	// 如果當前時間與 token 發行時間的差超過了2小時（即2*3600秒），則認為token已經過期
	if (now - iat > 3600 * 2) {
		console.log(`token expired , now - iat = ${now - iat}`);
		return true;
	}
	// 如果 token 還未過期，則返回 false
	return false;
};

export const cookieSync = () => {
	// 處理Cookie，並存入sessionStorage
	let result = '';
	const cookieArr = document.cookie.split(';');
	cookieArr.forEach((item) => {
		if (item.includes('userInfo=')) {
			result = item.replace('userInfo=', '').trim();
		}
	});
	document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
	// Decode JWT
	sessionStorage.setItem('userInfo', result);
};

const defaultMessage: { key: string; data?: { [key: string]: any } } = {
	key: '',
	data: {},
};
export const toggleNotification = (
	message = defaultMessage,
	error: any,
	options = {}
) => {
	const params = { ...defaultMessage, ...message };
	if (message.key !== '') {
		notification.error({
			...options,
			message: params.key,
			description: error?.data?.message || '',
		});
	}
};

export const shouldNotForwardPropsWithKeys =
	<CustomProps>(props: Array<keyof CustomProps>) =>
	(propName: PropertyKey): boolean =>
		!props.map((p) => p.toString()).includes(propName.toString());
