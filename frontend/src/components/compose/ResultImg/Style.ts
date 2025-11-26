import styled from 'styled-components';
import Colors from '@styles/color';
import { Result } from 'antd';

export const ResultStyle = styled(Result)<{ theme: string }>`
	.ant-result-title {
		color: ${(p) =>
			p.theme === 'light' ? Colors.gpt_black_4 : Colors.gpt_white_1};
	}
	.ant-result-subtitle {
		color: ${(p) =>
			p.theme === 'light' ? Colors.gpt_black_4 : Colors.gpt_white_1};
	}
`;
