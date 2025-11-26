import axiosRequest from '@utils/request';

export const refreshTokenRequest = (refreshToken: string) => {
	console.log('refreshToken', refreshToken);
	return axiosRequest({
		method: 'get',
		url: '/v1/auth/refresh',
		// headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}` },
		headers: { Authorization: `Bearer ${refreshToken}` },
	})
		.then((response: any) => {
			sessionStorage.setItem('accessToken', response.data.accessToken);
			return response;
		})
		.catch((error) => {
			if (error?.status === 403) {
				localStorage.clear();
				sessionStorage.clear();
				window.location.assign(window.location.href);
			}
		});
};
