import { INQUIRE_TYPE, REGION_LIST } from '@constants/enum';

export const getSendMessageByInquireType = (data: TTemplateData) => {
	let newMessage = '';
	switch (data.inquireType) {
		case INQUIRE_TYPE.Shipment:
			newMessage = `Status of ${data.pn ? `PN: ${data.pn} under ` : ''}${data.order || '[order type]'}: ${data.no || '[order no.]'}`;
			break;
		case INQUIRE_TYPE['E&O accountability']:
			newMessage = `E&O status of ${data.pn} in ${data.region} region`;
			break;
		case INQUIRE_TYPE.BO:
		case INQUIRE_TYPE.ETD:
		default:
			newMessage = `${
				Object.keys(INQUIRE_TYPE)[
					Object.values(INQUIRE_TYPE).indexOf(data.inquireType)
				]
			} status of ${data.pn} in ${data.region} region`;
			break;
	}
	return newMessage;
};

export const getExtensionTitleByInquireType = (data: TTemplateData) => {
	switch (data.inquireType) {
		case INQUIRE_TYPE.ETD:
			return `ETD status of ${data.pn} in ${data.region}`;
		case INQUIRE_TYPE.Shipment:
			return 'Confirm shipment status for orders';
		case INQUIRE_TYPE.BO:
			return `BO status of ${data.pn} in ${data.region}`;
		case INQUIRE_TYPE['E&O accountability']:
			return `E&O status of ${data.pn} in ${data.region}`;
		default:
			return '';
	}
};

export const getRegionMapping = (region: REGION_LIST): REGION_LIST => {
	// 如果 region 是 ROAP，直接返回 ROAP
	if (region === REGION_LIST.ROAP) {
		return REGION_LIST.ROAP;
	}
	// 定義對應關係
	const mapping: Partial<Record<REGION_LIST, REGION_LIST>> = {
		[REGION_LIST.R2]: REGION_LIST.ROAP,
		[REGION_LIST.CN]: REGION_LIST.ROAP,
		[REGION_LIST.DS]: REGION_LIST.ROAP,
	};

	// 查看 region 是否在正向表中
	if (mapping[region]) {
		return mapping[region];
	}

	// 如果都找不到，回傳原值
	return region;
};

export const genExtensionMessageByInquireType = (
	data: TTemplateData,
	boCount: boolean = false
): Array<{ title: string; content: string }> => {
	let region = data.region;

	if (data.inquireType === INQUIRE_TYPE.Shipment) {
		region = REGION_LIST.CN;
		data.pn = data.pn ? data.pn : '[PN]';
	}

	const extensionMessages: Array<{ title: string; content: string }> = [];

	const inquireTypeToExtension = {
		[INQUIRE_TYPE.ETD]: [
			INQUIRE_TYPE.BO,
			INQUIRE_TYPE['E&O accountability'],
			INQUIRE_TYPE.Shipment,
		],
		[INQUIRE_TYPE.Shipment]: [INQUIRE_TYPE.BO, INQUIRE_TYPE.ETD],
		[INQUIRE_TYPE['E&O accountability']]: [
			INQUIRE_TYPE.BO,
			INQUIRE_TYPE.ETD,
		],
	};

	if (data.inquireType === INQUIRE_TYPE.BO) {
		if (boCount) {
			inquireTypeToExtension[INQUIRE_TYPE.BO] = [
				INQUIRE_TYPE.ETD,
				INQUIRE_TYPE.Shipment,
			];
		} else {
			inquireTypeToExtension[INQUIRE_TYPE.BO] = [
				INQUIRE_TYPE['E&O accountability'],
				INQUIRE_TYPE.Shipment,
			];
		}
	}
	const extensions = inquireTypeToExtension[data.inquireType] || [];

	for (const type of extensions) {
		let r = region;
		if (
			type === INQUIRE_TYPE['E&O accountability'] ||
			data.inquireType === INQUIRE_TYPE['E&O accountability']
		) {
			r =
				region !== REGION_LIST.ROAP
					? getRegionMapping(region as REGION_LIST)
					: '[region]';
		}

		if (type === INQUIRE_TYPE.Shipment && region !== REGION_LIST.CN) {
			continue;
		}

		const title = getExtensionTitleByInquireType({
			...data,
			inquireType: type,
			region: r,
		});
		const content = getSendMessageByInquireType({
			...data,
			inquireType: type,
			region: r,
		});
		if (title && content) {
			extensionMessages.push({ title, content });
		}
	}

	return extensionMessages;
};
