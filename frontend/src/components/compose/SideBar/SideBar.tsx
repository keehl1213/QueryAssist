import React from 'react';
import { Button } from '@atoms';
import Colors from '@/styles/color';
import * as Styled from './Style';
import CLOSE_ICON from '@assets/icons/closeIcon.svg?react';
// import LOGO_ICON from '@assets/icons/Logo.svg?react';
import Icon from '@ant-design/icons';
import { ApiOutlined } from '@ant-design/icons';
import UserInfo from '../UserInfo/UserInfo';

type PropsType = {
	isCloseSideBar: boolean;
	setIsCloseSideBar: React.Dispatch<React.SetStateAction<boolean>>;
	handleSelectPlugin: (key: string) => void;
	selectedPlugin: string;
};

const Sidebar: React.FC<PropsType> = React.memo(
	({
		isCloseSideBar,
		setIsCloseSideBar,
		handleSelectPlugin,
		selectedPlugin,
	}) => {
		return (
			<>
				<Styled.SidebarContainer
					style={{ width: isCloseSideBar ? 0 : 260 }}
					isCloseSideBar={isCloseSideBar}
				>
					<Styled.SidebarBlock>
						<div style={{ height: 'calc(100% - 108px)' }}>
							<div style={{ height: '100%' }}>
								{isCloseSideBar ? null : (
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignContent: 'center',
										}}
									>
										{/* <Styled.LogoButton
											style={{
												padding: '0px 0px',
												margin: '0 0 0 0',
											}}
											icon={
												<Icon
													component={LOGO_ICON}
													style={{
														width: '132px',
														fontSize: '150px',
														height: '28px',
														position: 'absolute',
													}}
												/>
											}
										/> */}
										<Button
											style={{
												padding: '8px 6px',
												margin: '0 0 16px',
												fontSize: '24px',
											}}
											icon={
												<Icon
													component={CLOSE_ICON}
													style={{ fontSize: '24px' }}
												/>
											}
											onClick={() => {
												setIsCloseSideBar(
													!isCloseSideBar
												);
											}}
										/>
									</div>
								)}
								<Styled.SidebarScrollerStyle
									style={{ height: '40%' }}
								>
									<Styled.KnowledgeBaseButton
										onClick={() =>
											handleSelectPlugin('AI_QUERY')
										}
									>
										<ApiOutlined
											style={{
												color:
													selectedPlugin ===
													'AI_QUERY'
														? Colors.figma_green_3
														: Colors.figma_white_4,
												marginRight: '8px',
												verticalAlign: 'top',
											}}
										/>
										<Styled.PluginLabel>
											<span
												style={{
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													color:
														selectedPlugin ===
														'AI_QUERY'
															? Colors.figma_green_3
															: Colors.figma_white_4,
												}}
												title="AI智慧查詢"
											>
												AI智慧查詢
											</span>
										</Styled.PluginLabel>
									</Styled.KnowledgeBaseButton>
								</Styled.SidebarScrollerStyle>
							</div>
						</div>
						<div>
							<UserInfo isCloseSideBar={isCloseSideBar} />
						</div>
					</Styled.SidebarBlock>
				</Styled.SidebarContainer>
			</>
		);
	}
);

export default Sidebar;
