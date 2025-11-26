import styled from 'styled-components';
import Colors from '@styles/color';
import { Button } from '@atoms';
import { Form, Upload, Input, Select } from 'antd';
import { shouldNotForwardPropsWithKeys } from '@utils/common';

export const Container = styled.div`
	height: 100vh;
	background-color: ${Colors.gpt_black_3};
	display: flex;
	width: 100%;
`;

export const ChatContainer = styled.div`
	color: ${Colors.gpt_white_1};
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const ChatTextContainer = styled.div
	.withConfig({
		shouldForwardProp: shouldNotForwardPropsWithKeys<{
			messageBarHeight: number;
		}>(['messageBarHeight']),
	})
	.attrs<{
		messageBarHeight: number;
	}>({})`
	height: calc(
		100vh - 7rem
			${(p) =>
				p.messageBarHeight > 101
					? `- ${p.messageBarHeight + 50}px + 7rem`
					: null}
	);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

export const ChatMessageContain = styled.div`
	z-index: 1;
	height: 7rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	left: 0;
	bottom: 0;
	position: absolute;
	background-image: linear-gradient(
		180deg,
		rgba(53, 55, 64, 0),
		#353740 58.85%
	);
`;

export const PropmtModal = styled.div`
	white-space: pre-line;
`;

export const DarkModeSelect = styled(Select)<{ twoColor?: boolean }>`
	color: ${Colors.figma_white_4} !important;
	border: 0;
	background: #202324;
	.ant-select-arrow {
		color: ${(p) =>
			p.twoColor ? Colors.black_3 : Colors.figma_white_4} !important;
	}
	&.ant-select {
		color: ${Colors.figma_white_4} !important;
		border-radius: 6px;

		.ant-select-selector {
			background: ${(p) =>
				p.twoColor
					? `linear-gradient(90deg, ${Colors.figma_green_2}, ${Colors.figma_blue_1})`
					: '#202324'} !important;
			text-align: left;
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

export const UploadBtn = styled(Button)`
	margin: 0 0 4px;
	padding: 12px;
	align-items: center;
	justify-content: center;
	height: 32px !important;
	width: 88px;
	padding: 0px !important;

	&.ant-btn {
		border-radius: 6px !important;
		background: transparent !important;
		border: 1px solid ${Colors.figma_blue_12} !important;
	}

	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		background-color: black !important;
	}

	&.ant-btn[disabled] {
		background: #ffffff14 !important;
		border: 1px solid #424242 !important;
		color: #ffffff40 !important;
	}
`;

export const StepperBtn = styled(Button)`
	margin: 0 0 4px;
	padding: 12px;
	align-items: center;
	justify-content: center;
	height: 32px !important;
	padding: 5px 16px !important;

	&.ant-btn {
		border-radius: 6px !important;
		background: ${Colors.figma_blue_11} !important;
		border: 1px solid ${Colors.figma_blue_11} !important;
	}

	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		background-color: ${Colors.survey_blue_4} !important;
		border: 1px solid ${Colors.survey_blue_4} !important;
	}
`;

export const StepperBlackBtn = styled(Button)`
	margin: 0 8px 4px 0;
	padding: 12px;
	align-items: center;
	justify-content: center;
	height: 32px !important;
	padding: 5px 16px !important;
`;

export const ActionBtn = styled(Button)<{ transType?: boolean }>`
  margin: 0 0 4px;
  padding: 12px;
  align-items: center;
  justify-content: center;
  height: 32px !important;
  padding: 5px 16px !important;

  &.ant-btn {
    border-radius: 6px !important;
    background: ${(p) => (p.transType ? Colors.figma_black_3 : Colors.figma_blue_12)} !important;
    border: 1px solid ${(p) => (p.transType ? Colors.figma_blue_12 : 'transparent')} !important;
  }

  &.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
    background-color: ${(p) => (p.transType ? 'transparent' : Colors.survey_blue_4)} !important;
    border: 1px solid ${(p) => (p.transType ? Colors.figma_blue_12 : Colors.survey_blue_4)} !important;
  }

  &.ant-btn[disabled] {
    background: #FFFFFF14 !important;
    border: 1px solid #424242 !important;
    color: #FFFFFF40 !important;
  }
}
`;

export const KnowledgeFormItem = styled(Form.Item)<{ themeMode?: string }>`
	&.ant-form-item .ant-form-item-label > label {
		color: ${(p) =>
			p.themeMode === 'dark'
				? Colors.gpt_white_1
				: Colors.gpt_black_1} !important;
	}
	&.ant-form-item .ant-form-item-extra {
		color: ${Colors.figma_white_4};
	}
`;

export const CustomUpload = styled(Upload)`
	:where(.css-dev-only-do-not-override-yp8pcc).ant-upload-wrapper
		.ant-upload-list
		.ant-upload-list-item
		.ant-upload-icon
		.anticon {
		color: ${Colors.white_1};
	}
	:where(.css-dev-only-do-not-override-1kuana8).ant-upload-wrapper
		.ant-upload-list
		.ant-upload-list-item
		.ant-upload-list-item-actions
		.ant-upload-list-item-action {
		opacity: 100%;
	}
	.ant-upload-list-item-name {
		color: ${Colors.white_1};
	}
	.ant-upload-list-item-container {
		color: ${Colors.white_1};
	}
`;

export const SharepointContainer = styled.div`
	position: absolute;
	right: 0px;
	top: 0px;
`;

export const ActionBox = styled.div`
	position: relative;
	// display: flex;
`;

export const FormAction = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 56px;
`;

export const Title = styled.div`
	font-size: 28px;
	color: ${Colors.white_1};
	font-weight: 700;
	text-align: center;
	margin-bottom: 30px;
`;

export const PromptTextArea = styled(Input.TextArea)`
	&.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper
		> textarea.ant-input {
		background: ${Colors.figma_black_3};
		color: ${Colors.white_1};
	}

	&.ant-input-affix-wrapper {
		border-color: #424242;
	}

	&.ant-input-textarea-show-count .ant-input-data-count {
		color: ${Colors.figma_white_4};
	}
`;

export const DarkInput = styled(Input)`
	&.ant-input-affix-wrapper {
		background: ${Colors.figma_black_3};
		color: ${Colors.white_1};
		border-color: #424242;
	}

	&.ant-input-outlined.ant-input-status-error:not(.ant-input-disabled) {
		background: ${Colors.figma_black_3};
		color: ${Colors.white_1};
	}

	.ant-input:not([disabled]):hover,
	.ant-input-affix-wrapper:not([disabled]):hover,
	.ant-input:not([disabled]):focus,
	.ant-input-affix-wrapper:not([disabled]):focus {
		color: ${Colors.white_1} !important;
		border-color: #424242;
	}

	&.ant-input-affix-wrapper .ant-input-clear-icon {
		color: rgb(255 255 255 / 25%);
	}
`;

export const OpenSideBarBtn = styled(Button)`
	margin: 16px 0 0 16px;

	&.ant-btn {
		background: transparent !important;
	}
`;
