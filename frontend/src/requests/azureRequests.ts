import axiosRequest from '@/utils/request';

const basename = '/api/azure';

type azureCallOBOResponse = {
	employeeId: string;
	email: string;
	name: string;
};

export const azureCallback = async (
	employeeId: string,
	email: string,
	name: string
) =>
	axiosRequest({
		url: `${basename}/callback?id=${employeeId}&email=${email}&name=${name}`,
		method: 'get',
	});

export const azureCallOBO = async (token: string) =>
	await axiosRequest<azureCallOBOResponse>({
		url: `${basename}/callOBOGraphAPI/${token}`,
		method: 'get',
	});

export const azureLogout = async (id: string) =>
	axiosRequest({
		url: `${basename}/logout?id=${id}`,
		method: 'get',
		data: {},
	});
