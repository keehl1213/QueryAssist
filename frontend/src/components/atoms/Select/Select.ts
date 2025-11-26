import { Select } from 'antd';
import Colors from '@styles/color';
import styled from 'styled-components';

const SelectStyle = styled(Select)`
	&.ant-select-filled:not(.ant-select-customize-input) {
		&.ant-select-status-error .ant-select-selector {
			border-color: ${Colors.red_1};
		}
		.ant-select-selector {
			border-color: ${Colors.white_1};
		}
	}

	&.ant-select-filled:not(.ant-select-focused) {
		.ant-select-arrow,
		.ant-select-selection-item {
			color: ${Colors.white_1};
		}
	}
	&.ant-select-single:not(.ant-select-auto-complete)
		.ant-select-selector:not([disabled]):hover {
		border-color: ${Colors.white_1};
	}

	&.ant-select-focused:not(.ant-select-auto-complete).ant-select-single
		.ant-select-selector {
		border-color: ${Colors.white_1} !important;
	}

	&.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(
			.ant-pagination-size-changer
		):hover
		.ant-select-selector {
		border-color: ${Colors.white_1};
	}

	&.ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector,
	&.ant-select-selector:not([disabled]):hover {
		background-color: ${Colors.white_1} !important;
	}

	// muti
	&.ant-select-focused:not(.ant-select-auto-complete).ant-select-multiple
		.ant-select-selector {
		border: 1px solid ${Colors.white_1} !important;
	}

	&.ant-select-multiple .ant-select-selection-item {
		background-color: ${Colors.white_1} !important;
	}
`;

export default SelectStyle;
