import styled from 'styled-components';
import Colors from '@/styles/color';
import { Button } from 'antd';

export const SidebarContainer = styled.div`
	background-color: ${Colors.gpt_black_6};
	height: 100vh;
	// padding: 0.5rem;
	padding: 13px 16px 12px 16px;
	width: 260px;
	.ant-form-item-explain-error {
		display: none;
	}
`;

export const SidebarBlock = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const FormLabel = styled.div`
	color: white;
	font-size: 14px;
	padding-bottom: 8px;
`;

export const TypeButton = styled.button`
	background-color: #f4f4f414;
	border-radius: 100px;
	color: white;
	padding: 4px 12px;
	border: none;
	cursor: pointer;
	font-size: 14px;

	&:hover {
		background-color: ${Colors.gpt_white_1}33;
	}
`;

export const SmallTitle = styled.div`
	font-size: 14px;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: 12px;
`;

export const SideBarSpan = styled.span`
	background-color: #f4f4f414;
	padding: 12px;
	border-radius: 12px;
	display: inline-block;
	width: 100%;
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
`;

export const SubmitButton = styled(Button)`
	background: #5ac3eb;
	color: white;
	border: none;
	border-radius: 8px;
	padding: 8px 16px;
	cursor: pointer;
	font-size: 14px;
	align-self: center;

	&.ant-btn-default:not([disabled]):not(.ant-btn-dangerous):hover {
		color: white !important;
		background: #5ac3eb !important;
	}

	&.ant-btn-text:disabled {
		color: white !important;
	}

	&.ant-btn[disabled],
	.ant-btn[disabled]:hover,
	.ant-btn[disabled]:focus,
	.ant-btn[disabled]:active {
		background: none;
	}
`;
