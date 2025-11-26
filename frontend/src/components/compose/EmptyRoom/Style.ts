import styled from 'styled-components';
import Colors from '@styles/color';
import { Button } from '@atoms';
import { Button as antButton, Menu, Input, Select, Divider } from 'antd';

export const SidebarContainer = styled.div<{ isCloseSideBar: boolean }>`
	background-color: ${Colors.gpt_black_1};
	height: 100vh;
	// padding: 0.5rem;
	padding: 13px ${(p) => (p.isCloseSideBar ? '0' : '10')}px 12px
		${(p) => (p.isCloseSideBar ? '0' : '10')}px;
	width: ${(p) => (p.isCloseSideBar ? '0' : '260')}px;
`;

export const PluginFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 12px;
`;

export const SidebarBlock = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const EllipsisText = styled.div`
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-right: 15px;
`;

export const ButtonThemeContain = styled.div`
	&.hide {
		// display: inline-block;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: normal;
	}
	&.show {
		display: flex;
	}
`;

export const PDFBtnContain = styled.div`
	margin-top: 40px;
	display: flex;
	justify-content: center;
`;

// export const CardBoxHover = styled.div`
//     background-color: ${Colors.gpt_black_4};
//     color: ${Colors.gpt_white_1};
//     padding: 10px;
//     border-radius: 5px;
//     &:hover {
//         background-color: ${Colors.gpt_black_1};
//         cursor: pointer;
//     }
// `;

export const GPTText = styled.div`
	font-size: 2.25rem;
	text-align: center;
	padding-bottom: 20px;
	font-weight: 600;
	background-clip: text;
	backgroud-image: linear-gradient(
		90deg,
		${Colors.figma_green_2},
		${Colors.figma_blue_1}
	);
`;

export const GPTTitle = styled.div`
	margin-bottom: 16px;
	height: 41px;
`;

export const ChatButton = styled(Button)<any>`
	width: 100%;
	padding: 12px 12px 8px;
	display: flex;
	align-items: center;
	text-align: start;
	font-size: 14px;
	padding-right: 6px;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
	}
	:hover .hide {
		opacity: 1;
		color: ${Colors.figma_green_3};
	}
`;

export const AddChatButton = styled(Button)`
	width: 100%;
	// height: 50px;
	margin: 0 0 4px;
	padding: 12px;
	display: flex;
	align-items: center;
	// font-size: 16px;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
	}
	&.ant-btn {
		border: 1px solid;
		border-color: ${Colors.gpt_white_2} !important;
	}
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		border-color: ${Colors.gpt_white_2} !important;
	}
`;

export const ActionButton = styled(Button)`
	width: 100%;
	margin: 0 0 4px;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
	}
	&.ant-btn {
		border: 1px solid;
		border-color: ${Colors.gpt_white_2} !important;
	}
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		border-color: ${Colors.gpt_white_2} !important;
	}
`;

export const ChatDateText = styled.div`
	color: ${Colors.gpt_grey_2};
	padding: 5px 12px;
	font-size: 12px;
`;

export const ThemeInput = styled(Input)`
	border-color: ${Colors.figma_green_3} !important;
	color: ${Colors.white_1} !important;
	box-shadow: 0 0 0 0 transparent !important;
	background: ${Colors.gpt_black_1} !important;
	height: 26px !important;
	border-radius: 6px !important;

	&.ant-input:not([disabled]):hover,
	.ant-input-affix-wrapper:not([disabled]):hover,
	.ant-input-outlined:focus-within {
		border-color: ${Colors.figma_green_3} !important;
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	border: 2px solid ${Colors.black_3};
	border-radius: 9px;
`;

// background:${`linear-gradient(90deg, ${Colors.figma_green_2}, ${Colors.figma_blue_1})`}
export const ModalSelect = styled(Select)<{ twoColor?: boolean }>`
	color: ${Colors.gpt_white_1} !important;
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
			border-radius: 0 6px 6px 0;
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
`;

export const WelcomeGPTText = styled.div`
	white-space: pre-line;
	width: 429px;
	& a,
	a:link,
	a:visited {
		color: ${Colors.blue_4} !important;
		width: 400px;
	}
`;

export const SidebarActionSmallBlock = styled.div`
	width: 42px;
	height: 45px;
	border-radius: 6px;
	border: 1px;
	display: inline-block;
	margin-right: 6px;
`;

export const SidebarActionLargeBlock = styled.div`
	width: calc(100% - 96px);
	height: 45px;
	border-radius: 6px;
	border: 1px;
	display: inline-block;
	vertical-align: top;
`;

export const CardButtonSelected = styled(antButton)`
	padding: 5px 16px;
	color: ${Colors.company_name_blue_1} !important;
	background-color: ${Colors.white_1} !important;
	border: 1px solid ${Colors.figma_gray_4} !important;
	margin: 0 4px 4px 0px !important;
	border-radius: 6px !important;
`;

export const CardButton = styled(antButton)`
	padding: 5px 16px;
	color: ${Colors.grey_5} !important;
	background-color: transparent !important;
	border: 1px solid ${Colors.grey_5} !important;
	margin: 0 4px 4px 0px !important;
	border-radius: 6px !important;
`;

export const DevTitle = styled.div`
	padding: 0 8px;
	font-size: 18px;
	border-radius: 6px;
	background-color: ${Colors.purple_2};
	color: white;
	text-align: center;
	font-weight: 700;
	display: inline-block;
`;

export const QasTitle = styled.div`
	padding: 0 8px;
	font-size: 18px;
	border-radius: 6px;
	background-color: ${Colors.figma_green_3};
	color: white;
	text-align: center;
	font-weight: 700;
`;

export const EnvBlock = styled.div`
	height: 41px;
	vertical-align: top;
	margin-left: 12px;
	display: inline-flex;
	align-items: center;
`;

export const HistoryMenu = styled(Menu)`
	&.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
		height: 30px !important;
		line-height: 30px !important;
	}

	&.ant-menu-inline
		.ant-menu-sub.ant-menu-inline
		> .ant-menu-submenu
		> .ant-menu-submenu-title {
		height: 22px !important;
		line-height: 22px !important;
		font-size: 12px !important;
	}

	&.ant-menu-dark .ant-menu-item-selected {
		background-color: transparent !important;
	}

	&.ant-menu-inline .ant-menu-item {
		height: 30px !important;
		line-height: 30px !important;
		font-size: 14px !important;
		padding-right: 0px !important;
		padding-left: 0px !important;
	}

	&.ant-menu-dark,
	&.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
		background-color: ${Colors.gpt_black_1} !important;
	}

	&.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title {
		color: ${Colors.figma_white_4} !important;
	}
`;

export const GptSubTitle = styled.div`
	margin-top: -60px;
`;

export const GptSubTitleContent = styled.div`
	font-size: 40px;
`;

export const ActionButtonBlack = styled(Button)`
	border-color: transparent !important;
	background-color: black !important;
	width: 100%;
	margin: 0 0 4px;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
		background-color: black !important;
	}
	&.ant-btn {
		border: 1px solid;
		border-color: none !important;
	}
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		border-color: none !important;
		background-color: black !important;
	}
`;

export const TitleButton = styled(Button)`
	border-color: transparent !important;
	background-color: black !important;
	width: 100%;
	margin: 0 0 4px;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
	}
	&.ant-btn {
		border: 1px solid;
		border-color: ${Colors.gpt_white_2} !important;
	}
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		border-color: ${Colors.gpt_white_2} !important;
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

export const LinkButton = styled.div`
	color: #fff;
	display: inline-block;
	font-size: 14px;
	margin-left: 8px;
`;

export const KnoledgeBlock = styled.div`
	width: 300px;
	display: flex;
	margin-right: 10px;
	align-items: center;
`;

export const OptionLabel = styled.div`
	margin-right: 10px;
	white-space: nowrap;
	color: ${Colors.gpt_white_1};
	display: flex;
	align-items: center;
`;

export const PluginLabel = styled.div`
	white-space: nowrap;
	text-overflow: ellipsis;
	display: inline-block;
	width: calc(100% - 26px);
	overflow: hidden;
	text-align: left;
`;

export const PluginBlock = styled.div`
	color: ${Colors.figma_white_4};
	padding: 4px 12px;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const KnowledgeSelect = styled(Select)`
	color: ${Colors.gpt_white_1} !important;
	border: 0;

	.ant-select-selector {
		padding: 4px !important;
	}

	.ant-select-arrow {
		color: ${Colors.figma_gray_2} !important;
	}
	&.ant-select {
		color: ${Colors.gpt_white_1} !important;
		.ant-select-selector {
			background: ${Colors.figma_white_2} !important;
			color: ${Colors.gpt_white_1} !important;
			border: none !important;
		}
	}
	.ant-select-single:not(.ant-select-auto-complete)
		.ant-select-selector:not([disabled]):hover {
		color: ${Colors.gpt_white_1} !important;
	}

	.ant-select-clear {
		background: ${Colors.figma_gray_3} !important;
		color: ${Colors.figma_green_1} !important;
	}

	&.ant-select-single.ant-select-open .ant-select-selection-item {
		color: ${Colors.gpt_white_1} !important;
	}
`;

export const CreateKnowledgeButton = styled(Button)<{
	borderColor: string;
	textColor: string;
}>`
	border: 1px solid ${(p) => p.borderColor} !important;

	margin-left: 11px;
	width: 208px;
	text-align: left;
	border-radius: 6px !important;
	display: flex;
	align-items: center;
	height: 32px !important;

	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous),
	&.ant-btn {
		color: ${(p) => p.textColor} !important;
	}
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover,
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):focus,
	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):active {
		border: 1px solid ${(p) => p.borderColor} !important;
		color: ${(p) => p.textColor} !important;
	}
`;

export const LogoButton = styled(Button)`
	width: 100%;
	display: flex;
	margin-bottom: 18px;
	padding: 8px 6px;
`;

export const KnowledgeSelectBtn = styled(Button)`
	border-radius: 6px !important;
	text-align: center;
	background: rgba(0, 0, 0, 0.5) !important;
	color: ${Colors.figma_white_4} !important;
	border: 1px solid rgb(0, 0, 0) !important;
`;

export const KnowledgeBaseButton = styled(Button)`
	&.ant-btn {
		width: 90%;
		color: Colors.figma_white_4 !important;
		padding: 4px 12px;
		display: flex;
		align-items: center;
	}
`;
export const DividerLine = styled(Divider)`
	&.ant-divider-horizontal {
		margin: 16px 0 8px;
		border-color: ${Colors.gpt_white_2};
	}
`;

export const SidebarScrollerStyle = styled.div`
	transition: color 0.3s ease;
	color: #919baf80;
	overflow: hidden auto;

	&::-webkit-scrollbar-thumb {
		box-shadow: inset 0 0 0 10px;
	}
	&::-webkit-scrollbar,
	&::-webkit-scrollbar-thumb {
		width: 3px;
		height: 10px;
		border-radius: 13px;
		background-clip: padding-box;
	}
`;

export const OpenSideBarBtn = styled(Button)`
	margin: 0 8px 0 0;

	&.ant-btn {
		background: transparent !important;
	}
`;

export const HistorySearch = styled(Input)`
	color: ${Colors.white_1} !important;
	background-color: ${Colors.gpt_black_1} !important;

	.ant-input {
		color: ${Colors.white_1} !important;
	}
	.ant-input-clear-icon {
		color: ${Colors.white_1} !important;
	}
`;
