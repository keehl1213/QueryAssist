import styled from 'styled-components';
import { Button } from 'antd';

export const BlockBackground = styled.div`
	z-index: 1099;
	position: absolute;
	width: 100vw;
	height: 100vh;
	background: #00000099;
`;

export const CustonButton = styled(Button)`
	display: inline-block !important;
	width: 70px !important;
	min-width: 70px !important;
	line-height: 25px !important;
	border-radius: 11px !important;
	border: 1px solid #fff !important;
	cursor: pointer !important;
	text-align: center !important;
	background-color: gray !important;
	color: white !important;
	height: 25px !important;
	padding: 0px !important;
	:hover {
		background-color: #0d759f !important;
	}
`;
