import styled from 'styled-components';
import { Form } from 'antd';
import Colors from '@styles/color';
import MarkdownPreview from '@uiw/react-markdown-preview';

export const PageContainer = styled.div`
	width: 100%;
	height: calc(100vh - 64px); //header 64 px
`;

// 文字前面有點點
export const DotText = styled.div`
	list-style-type: disc;
	list-style-position: inside;
	display: list-item;
`;

export const NotifyTitle = styled.div`
	font-size: 16px;
	font-weight: 500;
	color: ${Colors.figma_blue_1};
	margin-right: 20px;
`;

export const NotifyContent = styled.div`
	line-height: 1;
	color: ${Colors.figma_black_1};
`;

// 左邊有一塊長方形
export const MsgBox = styled.div`
	color: #5a5a5a;
	background: #fafafa;
	font-size: 14px;
	padding: 7px;
	border-left: 8px solid ${Colors.figma_green_4};
`;

export const TitleText = styled.div<{ color?: string }>`
	font-size: 32px;
	padding-left: 10px;
	border-left: 10px solid ${Colors.company_name_green_2};
	color: ${(p) => p.color || Colors.gpt_white_1};
`;

export const ModalTitle = styled.div`
	font-size: 24px;
	color: ${Colors.gpt_black_4};
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 10px;
	border-bottom: 1px solid ${Colors.black_6};
`;

export const HoverButtonList = styled.div`
	display: flex;
	// position: absolute;
	top: 10px;
	right: 10px;
	.hide {
		visibility: hidden;
		// background: #2b2c2ff2 !important;
	}
`;

export const HoverButtonListSideBar = styled.div`
	display: flex;
	.hide {
		opacity: 0;
		background: #2b2c2ff2 !important;
		position: absolute;
		top: 5px;
		right: 10px;
	}
	.show {
		visibility: visible;
		background: none;
	}
`;

export const ScrollerStyle = styled.div<{
	bgColor?: string;
	hoverColor?: string;
}>`
	transition: color 0.3s ease;
	color: #919baf80;
	overflow: hidden auto;
	&:hover {
		color: ${(p) => (p.hoverColor ? p.hoverColor : '#ececf1d4')};
	}
	&::-webkit-scrollbar-thumb {
		box-shadow: inset 0 0 0 10px;
	}
	&::-webkit-scrollbar,
	&::-webkit-scrollbar-thumb {
		width: 10px;
		height: 10px;
		border-radius: 13px;
		background-clip: padding-box;
		border: 2px solid transparent;
		background: ${(p) => p.bgColor || '#51526138'};
	}
`;

export const FormItem = styled(Form.Item)<{ themeMode?: string }>`
	&.ant-form-item .ant-form-item-label > label {
		color: ${(p) =>
			p.themeMode === 'dark'
				? Colors.gpt_white_1
				: Colors.gpt_black_1} !important;
	}
`;

export const MDPreview = styled(MarkdownPreview)<{
	bgColor?: string;
	fontColor?: string;
}>`
	&.wmde-markdown {
		font-family:
			Noto Sans TC,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			'Noto Sans',
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol',
			'Noto Color Emoji';
		background: ${(p) => p.bgColor || Colors.gpt_grey_3};
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
		max-width: 100%;
	}
	&.wmde-markdown h1 {
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
		border-bottom: 1px solid ${(p) => p.fontColor || Colors.gpt_white_1};
	}
	&.wmde-markdown h2 {
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
		border-bottom: 1px solid ${(p) => p.fontColor || Colors.gpt_white_1};
	}
	&.wmde-markdown h3 {
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
	}
	&.wmde-markdown h4 {
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
	}
	&.wmde-markdown h5 {
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
	}
	&.wmde-markdown h6 {
		color: ${(p) => p.fontColor || Colors.gpt_white_1};
	}
	&.wmde-markdown img {
		background-color: ${(p) => p.bgColor || Colors.gpt_grey_3};
	}
	&.wmde-markdown table th {
		background: #656773;
		border: 1px solid ${(p) => p.fontColor || Colors.white_1};
	}
	&.wmde-markdown td,
	.wmde-markdown th {
		background: ${(p) => p.bgColor || Colors.gpt_grey_3};
		border: 1px solid ${(p) => p.fontColor || Colors.white_1};
	}
	&.wmde-markdown p {
		white-space: pre-line;
	}
`;
