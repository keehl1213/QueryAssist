import styled, { keyframes } from 'styled-components';
import Colors from '@styles/color';
import { Button } from '@atoms';
import { Select, Collapse } from 'antd';

export const CloumnBolck = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const MiniPageContain = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 8px;
	padding-top: 5px;
	z-index: 2;
`;

export const GPTHeadBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const UserHeadBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
`;

export const ResultBlock = styled.div`
	height: 100%;
	color: ${Colors.gpt_white_1};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
`;

export const GPTText = styled.div`
	font-size: 50px;
	text-align: center;
	padding-bottom: 50px;
`;

export const ChatButton = styled(Button)`
	width: 100%;
	// height: 50px;
	padding: 12px 12px 8px;
	display: flex;
	align-items: center;
	font-size: 16px;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
	}
`;

export const ChatContainer = styled.div`
	width: 100%;
	display: flex;
	font-size: 16px;
	flex-direction: column;
`;

export const ChatBlock = styled.div`
	display: flex;
	justify-content: center;
	margin: 10px 10px 5px;
	ul {
		list-style: disc;
	}
`;

export const PreContain = styled.pre`
	border: none !important;
	background: transparent !important;
	color: ${Colors.gpt_white_1};
`;

//= ==Question====
export const QuestionAvatar = styled.div`
	width: 15%;
	padding-left: 12px;
	color: ${Colors.gpt_white_1};
`;

export const QuestionLine = styled.div`
	width: 70%;
	display: flex;
	justify-content: flex-end;
	// overflow-wrap: anywhere;
`;

export const QuestionContain = styled.div`
	display: flex;
	flex-direction: column;
`;

export const QuestionText = styled.div`
	border-radius: 6px;
	background: ${Colors.company_name_green_3};
	display: flex;
	align-items: center;
	// justify-content: flex-end;
	:hover .hide {
		visibility: visible;
	}
	div:where(.css-dev-only-do-not-override-yp8pcc).ant-typography,
	:where(.css-dev-only-do-not-override-yp8pcc).ant-typography p {
		margin-bottom: 0;
	}
	div:where(.css-yp8pcc).ant-typography,
	:where(.css-yp8pcc).ant-typography p {
		margin-bottom: 0;
	}
	div:where(.css-dev-only-do-not-override-yp8pcc).ant-typography pre,
	:where(.css-dev-only-do-not-override-yp8pcc).ant-typography blockquote {
		margin: 0;
	}
	.ant-typography pre {
		font-family:
			Noto Sans TC,
			-apple-system,
			'Segoe UI',
			Helvetica,
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji';
		font-size: 16px;
		margin: 0;
	}
	.ant-input,
	.ant-input-affix-wrapper {
		color: ${Colors.gpt_white_1};
		background-color: ${Colors.company_name_green_3};
		overflow-y: hidden;
		border-radius: 6px;
		font-size: 16px;
	}
	.ant-input:not([disabled]):hover,
	.ant-input-affix-wrapper:not([disabled]):hover {
		color: ${Colors.gpt_white_1};
		background-color: ${Colors.company_name_green_3};
	}
	.ant-input:not([disabled]):focus,
	.ant-input-affix-wrapper:not([disabled]):focus {
		color: ${Colors.gpt_white_1};
	}
	.ant-input[disabled],
	.ant-input-affix-wrapper[disabled],
	.ant-input.ant-input-affix-wrapper-disabled,
	.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled,
	.ant-input[disabled]:hover,
	.ant-input-affix-wrapper[disabled]:hover,
	.ant-input.ant-input-affix-wrapper-disabled:hover,
	.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled:hover {
		color: ${Colors.gpt_white_1};
		background-color: ${Colors.company_name_green_3};
		cursor: initial;
		font-size: 16px;
	}
`;

export const QuestionButtonList = styled.div`
	display: flex;
	align-items: center;
	margin: 8px;
	justify-content: flex-end;
`;

//= ==Answer====
export const AnsAvatar = styled.div`
	width: 15%;
	display: flex;
	justify-content: flex-end;
	padding-right: 12px;
	color: ${Colors.gpt_white_1};
`;

export const AnsBlock = styled.div`
	z-index: 999;
	width: 70%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
`;

export const AnsText = styled.div`
	max-width: 100%;
	padding: 10px 20px;
	border-radius: 6px;
	background: ${Colors.gpt_grey_3};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	:hover .hide {
		visibility: visible;
	}
	align-self: flex-start;
`;

export const ButtonList = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: end;
`;

export const MoreTextContainer = styled.div`
	width: 100%;
	padding-top: 8px;
	display: flex;
	justify-content: space-between;
`;

export const FloatModel = styled.div`
	color: ${Colors.figma_white_3};
	font-weight: 700;
	display: flex;
	position: fixed;
	padding: 16px 16px 8px 16px;
	z-index: 1000;
	background-color: ${Colors.gpt_black_3};
`;

export const FloatUsageModal = styled.div`
	color: ${Colors.figma_white_3};
	font-weight: 700;
	left: 2%;
	top: 6%;
	display: flex;
	position: absolute;
	span {
		color: ${Colors.white_1} !important;
	}
`;

export const GPTSelect = styled(Select)<{ twoColor?: boolean }>`
	color: ${Colors.figma_white_4} !important;
	border: 0;

	.ant-select-arrow {
		color: ${(p) =>
			p.twoColor ? Colors.black_3 : Colors.figma_white_4} !important;
	}
	&.ant-select {
		color: ${Colors.figma_white_4} !important;
		.ant-select-selector {
			background: ${(p) =>
				p.twoColor
					? `linear-gradient(90deg, ${Colors.figma_green_2}, ${Colors.figma_blue_1})`
					: Colors.black_3} !important;
			border-radius: 6px;
			text-align: center;
			color: ${(p) =>
				p.twoColor ? Colors.white_1 : Colors.figma_white_4} !important;
			border: none !important;
			span {
				font-weight: ${(p) => (p.twoColor ? '700' : '500')} !important;
			}
		}
		.ant-select-selection-placeholder {
			color: ${Colors.figma_white_4};
		}
	}
	.ant-select-single:not(.ant-select-auto-complete)
		.ant-select-selector:not([disabled]):hover {
		color: ${Colors.figma_white_4} !important;
	}

	.ant-select-clear {
		background: ${Colors.figma_gray_3} !important;
		color: ${Colors.figma_white_4} !important;
	}

	&.ant-select-single.ant-select-open .ant-select-selection-item {
		color: ${(p) =>
			p.twoColor ? Colors.black_3 : Colors.figma_white_4} !important;
	}

	&.ant-select-multiple .ant-select-selection-item {
		background-color: ${Colors.gpt_black_1} !important;
		.ant-select-selection-item-remove {
			display: flex;
		}
	}

	&.ant-select-focused:not(.ant-select-auto-complete).ant-select-multiple
		.ant-select-selector {
		border: 1px solid ${Colors.figma_blue_1} !important;
	}

	&.ant-select-disabled.ant-select:not(.ant-select-customize-input)
		.ant-select-selector {
		background-color: rgb(0 0 0 / 10%) !important;
		border: 1px solid #000000 !important;
	}
`;

export const OpenSideBarBtn = styled(Button)`
	margin: 0 8px 0 0;

	&.ant-btn {
		background: transparent !important;
	}
`;
export const StyledParagraph = styled.div`
	margin-bottom: 0;
	font-family:
		Noto Sans TC,
		Roboto,
		sans-serif;
	font-size: 14px;
	/* 其他 Typography.Paragraph 的样式 */
`;

export const StepsCollapse = styled(Collapse)`
	color: ${Colors.white_1};
	.ant-collapse-header {
		padding: 1px 12px !important;
		color: ${Colors.figma_white_4} !important;
		background-color: ${Colors.gpt_black_1} !important;
		border-radius: 6px !important;
		align-items: center !important;
	}
	.ant-collapse-content {
		background-color: ${Colors.gpt_black_1} !important;
		border: none !important;
	}
	.ant-collapse-item {
		border: none !important;
	}
	.wmde-markdown {
		background: ${Colors.gpt_black_1} !important;
	}
`;

const growAndFade = keyframes`
  0% {
    height: 0px;       /\* 初始高度 \*/
    opacity: 0;        /\* 初始透明 \*/
  }
  100% {
    height: 200px;     /\* 最終高度 \*/
    opacity: 1;        /\* 完全不透明 \*/
  }
`;

export const ExtensionBlock = styled.div`
	margin-top: 13px;
	animation: ${growAndFade} 2s ease forwards;
`;

export const ExtensionTitle = styled.div`
	opacity: 0.5;
	font-size: 16px;
	margin-bottom: 8px;
	color: ${Colors.white_1};
`;

export const ExtensionText = styled.div`
	font-size: 16px;
	flex: 1;
	opacity: 0.88;
	color: ${Colors.white_1};
`;

export const ExtensionWrapper = styled.div`
	margin-bottom: 18px;
	cursor: pointer;
	border-bottom: 1px solid #ffffff14;
	padding-bottom: 10px;
	display: flex;
`;

//= ==initial====
export const initialBlock = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	width: 75%;
`;

export const initialTitle = styled.div`
	opacity: 0.5;
	font-weight: 700;
	font-style: bold;
	font-size: 32px;
	leading-trim: none;
	line-height: 100%;
	letter-spacing: 0%;
	vertical-align: middle;
	margin-bottom: 8px;
	color: ${Colors.white_1};
`;

export const initialText = styled.div`
	font-weight: 400;
	font-style: regular;
	font-size: 16px;
	leading-trim: none;
	line-height: 100%;
	letter-spacing: 0%;
	vertical-align: middle;
	flex: 1;
	opacity: 0.88;
	color: ${Colors.white_1};
`;
