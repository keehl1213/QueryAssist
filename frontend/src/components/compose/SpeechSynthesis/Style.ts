import styled from 'styled-components';
import Colors from '@styles/color';
import { Button, Select } from '@atoms';
import { Button as antButton } from 'antd';

export const RegenContain = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const RegenButton = styled(Button)`
	display: flex;
	align-items: center;
	padding: 8px 12px;
	border: 1px solid ${Colors.gpt_white_2} !important;
`;

export const VersionBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	margin-bottom: 10px;
`;

export const VerticalDivider = styled.div`
	border-left: 1px solid #fff;
	display: flex;
	width: 20px;
	padding: 0px 4px;
	align-items: center;
	height: initial;
	margin-left: 5px;
`;

export const TextAreaContain = styled.div`
	width: 70%;
	margin: 12px 0px 5px 0px;
	display: flex;
	background-color: ${Colors.gpt_black_4};
	border-radius: 5px;
	color: ${Colors.gpt_white_1};
	position: relative;
	.ant-input,
	.ant-input-affix-wrapper {
		color: ${Colors.gpt_white_1};
		background-color: ${Colors.none};
		margin: 8px;
		transition: color 0.3s ease;
		overflow-x: hidden;
		&:hover {
			color: #ececf1d4;
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
			background: #505160cf;
		}
	}
	.ant-input[disabled],
	.ant-input-affix-wrapper[disabled],
	.ant-input.ant-input-affix-wrapper-disabled,
	.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled,
	.ant-input[disabled]:hover,
	.ant-input-affix-wrapper[disabled]:hover,
	.ant-input.ant-input-affix-wrapper-disabled:hover,
	.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled:hover {
		background-color: ${Colors.gpt_black_4};
	}
	.ant-input:not([disabled]):hover,
	.ant-input-affix-wrapper:not([disabled]):hover {
		color: ${Colors.gpt_white_1};
		background-color: ${Colors.none};
	}
	.ant-input:not([disabled]):focus,
	.ant-input-affix-wrapper:not([disabled]):focus {
		color: ${Colors.gpt_white_1};
	}
	.ant-input-suffix {
		.ant-input-clear-icon {
			color: ${Colors.gpt_grey_2};
			margin-right: 10px;
		}
	}
`;

export const NewText = styled.div`
	font-weight: 600;
	color: ${Colors.figma_orange_3};
	padding: 14px 0 0 28px;
`;

export const NewBlock = styled.div`
	border-radius: 4px 4px 4px 0px;
	color: ${Colors.white_1};
	background: ${Colors.figma_orange_3};
	display: inline-flex;
	padding: 0px 8px;
	justify-content: center;
	align-items: center;
`;

export const NewNotify = styled.div`
	position: absolute;
	left: calc(15% - 14px);
	bottom: 53%;
	display: flex;
	-webkit-box-pack: end;
	justify-content: flex-end;
`;

export const NewArrow = styled.div`
	position: absolute;
	bottom: 69.5%;
	position: absolute;
	left: calc(15% - 14px);
	bottom: 49%;
	display: flex;
	-webkit-box-pack: end;
	justify-content: flex-end;
`;

export const FloatText = styled.div`
	left: calc(85% + 8px);
	bottom: 18%;
	display: flex;
	position: absolute;
`;

export const SendIcon = styled.div<{ disableRegen: boolean }>`
	background: none !important;
	border: none !important;
	min-width: 0 !important;
	color: ${Colors.gpt_white_1} !important;

	& span:hover {
		color: ${Colors.figma_green_3} !important;
	}

	& button:disabled span {
		color: ${Colors.white_1} !important;
		opacity: 0.4;
	}

	.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		background: none !important;
	}
`;

export const InputContain = styled.div`
	width: calc(70% - 26px);
	height: 60px;
	margin: 20px 0;
	display: flex;
	&:focus-within {
		// border-color: ${Colors.gpt_black_4};
		border: 0;
		box-shadow: 0 0 0 2px rgb(84 128 226 / 20%);
		border-right-width: 1px;
		border-radius: 5px;
	}

	.ant-input-search
		> .ant-input-group
		> .ant-input-group-addon:last-child
		.ant-input-search-button:not(.ant-btn-primary) {
		color: ${Colors.gpt_white_1};
		&:hover {
			color: ${Colors.gpt_black_4};
		}
	}
	.ant-input-search
		.ant-input-group
		.ant-input-affix-wrapper:not(:last-child) {
		border-radius: 5px 0 0 5px;
		background-color: ${Colors.gpt_black_4};
	}
	.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child {
		border-radius: 0 5px 5px 0;
		.ant-input-search-button {
			border-radius: 0 5px 5px 0;
		}
	}
`;

export const KnowledgeContainer = styled.div`
	// width: calc(100% - 71px);
	width: 100%;
	display: flex;
	padding: 12px 8px;
	align-items: center;
`;

export const KnoledgeBlock = styled.div`
	width: 50%;
	display: flex;
	margin-right: 10px;
	align-items: center;
`;

export const PluginBlock = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
`;

export const OptionLabel = styled.div`
	margin-right: 10px;
	white-space: nowrap;
	color: ${Colors.gpt_white_1};
	display: flex;
	align-items: center;
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

export const PluginSelect = styled(Select)`
	color: ${Colors.gpt_white_1} !important;
	border: 0;

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
		.ant-select-selection-placeholder {
			color: ${Colors.gpt_white_1};
		}
	}
	.ant-select-single:not(.ant-select-auto-complete)
		.ant-select-selector:not([disabled]):hover {
		color: ${Colors.gpt_white_1} !important;
	}

	.ant-select-clear {
		background: ${Colors.figma_gray_3} !important;
		color: ${Colors.figma_blue_1} !important;
	}

	&.ant-select-single.ant-select-open .ant-select-selection-item {
		color: ${Colors.gpt_white_1} !important;
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

export const PluginFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 12px;
`;

export const PluginTitle = styled.div`
	color: ${Colors.gpt_white_1};
	padding: 5px 12px;
	background: #00000073;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const MicBlock = styled.div`
	position: absolute;
	right: 22%;
	bottom: 18%;
	display: flex;
	justify-content: flex-end;
`;

export const MicIconBtn = styled(antButton)`
	background: none !important;
	border: none !important;
	min-width: 0 !important;
	color: ${Colors.gpt_white_1} !important;
	padding: 0px;
	& span:hover {
		color: ${Colors.figma_green_3} !important;
	}
`;

export const MicIconBtnActive = styled(antButton)`
	background: none !important;
	border: none !important;
	min-width: 0 !important;
	padding: 0px;
	color: ${Colors.figma_green_3} !important;
`;

export const KnowledgePlaceholder = styled.div`
	color: ${Colors.figma_orange_2};
	font-size: 12px;
	padding: 0px 10px;
`;

export const MicIconBtnDisabled = styled(antButton)`
	background: none !important;
	border: none !important;
	min-width: 0 !important;
	color: ${Colors.white_1} !important;
	opacity: 0.4;
	padding: 0px;
`;

export const ActionButton = styled(Button)`
	width: 100%;
	margin: 0 0 4px;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent !important;
	border: none !important;
	&:focus-visible {
		outline: none !important;
	}
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
		background: transparent !important;
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

export const LinkButton = styled.div`
	color: #fff;
	width: 136px;
	display: flex;
	align-items: flex-end;
	font-size: 14px;
`;

export const FileIconBtn = styled(antButton)<{ pdfMode: boolean }>`
	background: none !important;
	border: none !important;
	min-width: 0 !important;
	color: ${Colors.gpt_white_1} !important;
	padding: 0px;
	position: absolute;
	bottom: 10px;
	right: ${(p) => (p.pdfMode ? '150px' : '110px')};
	z-index: 5;

	& span:hover {
		color: ${Colors.figma_green_3} !important;
	}

	& button:disabled span {
		color: ${Colors.figma_white_4} !important;
	}

	.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		background: none !important;
	}
`;

export const ImageIconBtn = styled(antButton)`
	background: none !important;
	border: none !important;
	min-width: 0 !important;
	color: ${Colors.gpt_white_1} !important;
	padding: 0px;
	position: absolute;
	bottom: 10px;
	right: 110px;
	z-index: 5;

	& span:hover {
		color: !important;
	}

	& button:disabled span {
		color: ${Colors.figma_white_4} !important;
	}

	.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		background: none !important;
	}
`;

export const FavoriteBarContainer = styled.div<{ disabled: boolean }>`
	display: flex;
	align-items: center;
	background: none !important;
	position: absolute;
	top: -35px;
	left: 0px;
	z-index: 5;
	width: 100% !important;
	color: ${Colors.figma_white_4};
	pointer-events: ${(p) => (p.disabled ? 'none' : 'auto')};

	& span:hover {
		color: !important;
	}
`;

export const FavoriteBar = styled.div`
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  span {
   color: ${Colors.figma_white_4};
  }
}
`;

export const FileContainer = styled.div`
	border: 0.5px solid ${Colors.figma_white_4};
	border-radius: 8px;
	padding: 6px 10px;
	color: white;
	width: 164px;

	:hover {
		background-color: ${Colors.gpt_black_3};
	}
`;

export const FileIcon = styled.div`
	padding: 4px;
	border-radius: 2px;
	color: ${Colors.black_3};
`;

export const FileText = styled.div`
	margin-left: 10px;
	display: flex;
	flex-direction: column;
	width: 70%;
`;

export const FileName = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const FileDelete = styled.div`
	margin-left: auto;
	opacity: 0;
	transition: opacity 0.3s;
	button {
		min-width: 10px;
		color: ${Colors.figma_white_4};
	}
	button:hover {
		min-width: 10px;
		color: ${Colors.figma_white_4} !important;
	}
	:hover {
		opacity: 1;
	}
`;

export const PromptDropdownItem = styled.div`
	.ant-dropdown-menu {
		background-color: ${Colors.gpt_black_1} !important;
		.ant-dropdown-menu-item {
			color: ${Colors.figma_white_6} !important;
		}
	}
	.ant-dropdown-menu .ant-dropdown-menu-item-disabled:hover {
		color: #5a5a5a !important;
		background-color: #ffffff14 !important;
	}
`;
