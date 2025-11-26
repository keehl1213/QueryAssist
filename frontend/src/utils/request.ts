/**
 * 參考：https://github.com/ivjose/monorep-setup/blob/8b0f31c37a2ef6debe8df88331c6bb7fb5d02e29/packages/core-admin/src/utils/request.ts
 */

import axios, {
	AxiosResponse,
	AxiosError,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
} from 'axios';
// import RefreshTokenQueue from './RefreshTokenQueue';

/**
 * Create an Axios Client with defaults
 */
export const client = axios.create({
	// baseURL: 'http://localhost:3000',
	withCredentials: true,
});

// Request interceptors
client.interceptors.request.use(
	(config: InternalAxiosRequestConfig<any>) => {
		const noAuthApi = [
			'/v1/auth/login',
			'/v1/auth/azure/callback',
			'/v1/auth/refresh',
		];
		if (!noAuthApi.some((x) => config?.url?.includes(x))) {
			config.headers.authorization = `Bearer ${sessionStorage.getItem('azureAccessToken')}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const axiosRequest = function <T>(
	options: AxiosRequestConfig
): Promise<AxiosResponse<T, any>> {
	const onSuccess = function (response: AxiosResponse<T>) {
		console.debug('Request Successful!', response);
		return response;
	};

	const onError = function (error: AxiosError) {
		console.error('Request Failed:', error.config);

		if (error.response) {
			// Request was made but server responded with something
			// other than 2xx
			console.error('Status:', error.response.status);
			console.error('Data:', error.response.data);
			console.error('Headers:', error.response.headers);

			if (error.response.status == 401) {
				// RefreshTokenQueue.addToQueue({
				// 	refreshToken: sessionStorage.getItem('refreshToken') || '',
				// });
				window.location.href = '/';
			}
		} else {
			// Something else happened while setting up the request
			// triggered the error
			console.error('Error Message:', error.message);
		}

		return Promise.reject(error.response || error.message);
	};

	return client(options).then(onSuccess).catch(onError);
};

export default axiosRequest;
