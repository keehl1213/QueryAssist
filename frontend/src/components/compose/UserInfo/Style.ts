import styled from 'styled-components';
import Colors from '@styles/color';
import { Button } from '@atoms';
import { Divider, Menu } from 'antd';

export const Contain = styled.div`
	width: 100%;
	color: ${Colors.gpt_white_1};
	padding-top: 0.5rem;
`;

export const DividerLine = styled(Divider)`
	&.ant-divider-horizontal {
		margin: 0;
		border-color: ${Colors.gpt_white_2};
	}
`;

export const DividerLineDark = styled(Divider)`
	&.ant-divider-horizontal {
		margin: 0;
		border-color: ${Colors.gpt_black_1};
	}
`;

export const InfoButton = styled(Button)`
	width: 100%;
	// height: 50px;
	padding: 12px 12px 8px;
	display: flex;
	align-items: center;
	font-size: 14px;
	&.ant-btn {
		display: flex;
		justify-content: flex-start;
	}
`;

export const InfoDiv = styled.div`
	width: 100%;
	padding: 12px 12px 8px;
	display: flex;
	align-items: center;
	font-size: 14px;
`;

export const UserBtnContain = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const BtnContain = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

export const IconText = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
`;

export const SettingMenu = styled(Menu)`
	&.ant-menu-light .ant-menu-item-selected {
		background-color: #ffffff14 !important;
	}

	&.ant-menu-light .ant-menu-item-selected,
	&.ant-menu-light .ant-menu-item {
		color: #ffffffd9 !important;
	}

	&.ant-menu-light {
		background: #1f1f1f !important;
	}

	&.ant-menu-light.ant-menu-root.ant-menu-vertical {
		border-radius: 8px !important;
	}

	&.ant-menu-vertical > .ant-menu-item {
		height: 32px;
		line-height: 32px;
	}

	&.ant-menu-light
		.ant-menu-item:not(.ant-menu-item-selected):not(
			.ant-menu-submenu-selected
		):hover {
		color: #ffffffd9 !important;
	}
`;
