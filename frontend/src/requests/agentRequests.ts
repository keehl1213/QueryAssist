import axiosRequest from '@/utils/request';

const basename = '/api/be-agent';

const regex = /<info>(.*?)<\/info>/g;

export const getAIBackOrder = async (question: string) => {
	const result = await axiosRequest<AIBackOrderResponse>({
		url: `${basename}/access`,
		method: 'post',
		data: { question },
	});

	const hiddenParts = [...result.data.output.matchAll(regex)].map(
		(match) => match[1]
	);

	const visibleText = result.data.output.replace(regex, '').trim();

	let info;
	if (hiddenParts.length) {
		try {
			info = JSON.parse(hiddenParts[0]);
		} catch (error: any) {
			console.error('JSON 解析失败:', error.message);
			info = null;
		}
	}

	return {
		...result,
		data: {
			...result.data,
			output: visibleText,
			info,
		},
	};
};
