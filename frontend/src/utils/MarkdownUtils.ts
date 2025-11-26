// This function escapes Markdown special characters in a given string.
// 單個 * 會被轉換成 \*，單個 ~ 會被轉換成 \~
// 多個 * 會被保留，多個 ~ 會被保留
// 將正則表達式提取到組件外部
// const ESCAPE_ASTERISK_REGEX = /([^*])\*(?![*])/g;
const ESCAPE_TILDE_REGEX = /([^~])~(?!~)/g;

export const escapeMarkdownSymbols = (source: string) => {
	let rtn = '';
	if (typeof source === 'string') {
		// rtn = source?.replace(ESCAPE_ASTERISK_REGEX, '$1\\*');
		rtn = source?.replace(ESCAPE_TILDE_REGEX, '$1\\~');
	}
	return rtn;
};
