declare module 'react-speech-kit';

type UserInfoProps = {
	name: string;
	email: string;
	roleId: string;
	employeeId: string;
	region: string;
	id: string;
	useAI: boolean;
	deptId: string;
};

type UserProps = {
	locale: string;
	setLocale: (string) => void;
	userData?: UserInfoProps;
	globalLoading: boolean;
	setGlobalLoading: (value: boolean) => any;
	isLogin: () => boolean;
};

type TChatMessageTree = {
	id: string;
	content: string;
	role: string;
	parent?: string | null;
	children?: string[];
	createdAt?: number;
	errorContent?: string;
	errorType?: string;
	status?: string;
	edit?: boolean; // frontend
	contextList?: TChatContext[];
	explains?: TExplain[];
	rating?: string;
	bindingId?: string;
	fileMap?: string[];
	steps?: string[];
	extensionInfo?: TTemplateData;
};

type TContextContain = {
	context?: string;
	ids?: string[];
	filePaths?: string[];
};

type TTreeList = Array<TChatMessageTree>;

type TSendData = {
	inquireType: string;
	region?: string;
	pn?: string;
	message?: string;
	mo?: string;
	do?: string;
	so?: string;
};

type BackOrderRequest = {
	inquireType: string;
	region?: string;
	pn?: string;
	MO?: string;
	DO?: string;
	SO?: string;
};

type BackOrderResponse = {
	code: number;
	msg: string;
	data: {
		success: boolean;
		data: {
			answerPrompt: string;
		};
	};
};

type AIBackOrderResponse = {
	input: string;
	output: string;
};

type ChatProps = {
	syncMessage: string;
	setSyncMessage: React.Dispatch<React.SetStateAction<string>>;
};

type TTemplateData = {
	inquireType: any;
	region: string;
	pn: string;
	order: string;
	no: string;
};
