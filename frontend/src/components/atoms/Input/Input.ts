import { Input } from 'antd';
import Colors from '@styles/color';
import styled from 'styled-components';

const InputStyle = styled(Input)`
	&.ant-input-affix-wrapper:not([disabled]):hover {
		border-color: ${Colors.figma_blue_1};
	}
`;

export default InputStyle;
