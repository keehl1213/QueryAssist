import styled from 'styled-components';
import loginbk from '@assets/images/loginBackground.jpg';
import { Card } from 'antd';

export const Container = styled.div`
	background: url(${loginbk});
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;

export const LoginCard = styled(Card)`
	box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
	border-radius: 16px;
	.ant-card-cover > * {
		border-radius: 16px 16px 0 0;
	}
`;
