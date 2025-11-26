export const APP_PREFIX = '/app';
export const FULLPAGE_PREFIX = '/';

const PATH: { [path: string]: string } = {
	LOGIN: '/',
	OAUTH_CALLBACK: '/:code',
	CHATROOM: `${APP_PREFIX}/chatroom`,
};

export const PATH_MAP = Object.keys(PATH).reduce<{ [key: string]: string }>(
	(map, key) => ({ ...map, [PATH[key]]: key }),
	{}
);

export default PATH;
