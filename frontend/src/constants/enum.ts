export enum SPEAK_MODE {
	LISTEN = 'LISTEN',
	SPEAK = 'SPEAK',
	LOADING = 'LOADING',
}

export enum INQUIRE_TYPE {
	BO = <any>'01',
	ETD = <any>'20',
	Shipment = <any>'21',
	'E&O accountability' = <any>'22',
}

export enum REGION_LIST {
	EMEA = 'EMEA',
	NA = 'NA',
	BR = 'BR',
	MX = 'MX',
	SSSPF = 'SSSPF',
	R2 = 'R2',
	CN = 'CN',
	'JP&AU' = 'JP&AU',
	IN = 'IN',
	ROAP = 'ROAP',
	IN_DS = 'IN_DS',
	US_CA = 'US_CA',
	DS = 'DS',
}

export enum ORDER_LIST {
	MO = 'MO',
	DO = 'DO',
	SO = 'SO',
}

export enum CHAT_TYPE {
	GuidedInput = 'GuidedInput',
	ManualInput = 'ManualInput',
	VoiceInput = 'VoiceInput',
}
