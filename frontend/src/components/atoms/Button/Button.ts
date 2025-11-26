import { Button } from 'antd';
import Colors from '@styles/color';
import styled from 'styled-components';
import { shouldNotForwardPropsWithKeys } from '@utils/common';

interface ButtonGroupType {
	readonly shape?: string;
	readonly bgColor?: string;
	readonly height?: string;
	readonly mode?: string;
	readonly fontColor?: string;
	readonly radius?: string;
	readonly fontSize?: string;
}

const ButtonStyle = styled(Button)
	.withConfig({
		shouldForwardProp: shouldNotForwardPropsWithKeys<ButtonGroupType>([
			'bgColor',
		]),
	})
	.attrs<ButtonGroupType>({})`
	&.ant-btn {
		border: 0;
		min-width: 0;
		background: ${(p) => p.bgColor || Colors.gpt_black_1} !important;
		color: ${(p) => p.fontColor || Colors.gpt_white_1} !important;
		height: ${(p) => p.height || 'fit-content'};
		border-radius: ${(p) => p.radius || null};
		font-size: ${(p) => p.fontSize || '14px'} !important;
		box-shadow: none !important;
	}

	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		color: ${(p) =>
			p.mode === 'light'
				? p.fontColor || Colors.gpt_black_1
				: Colors.gpt_white_1} !important;
		background: ${(p) =>
			p.mode === 'light'
				? (p.bgColor &&
						p.bgColor !== Colors.none &&
						p.bgColor !== Colors.white_1 &&
						`${p.bgColor}99`) ||
					Colors.gpt_grey_4
				: Colors.gpt_grey_1} !important;
	}

	&.ant-btn-text:disabled {
		color: ${Colors.gpt_grey_4} !important;
	}

	&.ant-btn[disabled],
	.ant-btn[disabled]:hover,
	.ant-btn[disabled]:focus,
	.ant-btn[disabled]:active {
		background: none;
	}

	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous),
	.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):focus {
		background: ${Colors.none};
	}
`;

export default ButtonStyle;
