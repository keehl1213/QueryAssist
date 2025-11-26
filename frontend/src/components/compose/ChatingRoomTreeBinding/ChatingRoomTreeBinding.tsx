import React, { Fragment } from 'react';
import { Avatar, Typography } from 'antd';
import { ResultImg } from '@compose';
import Colors from '@styles/color';
import * as GlobalStyled from '@styles/globalStyle';
import { escapeMarkdownSymbols } from '@utils/MarkdownUtils';
import * as Styled from './Style';
import { useUserStore } from '@store/useUserContext';
// import COMPANY_NAME_GPT_BODY from '@assets/icons/company_nameGptBody.svg?react';
import OPEN_ICON from '@assets/icons/openIcon.svg?react';
import Icon from '@ant-design/icons';
import rehypeExternalLinks from 'rehype-external-links';
import TYPING from '@assets/gifs/gifTyping.svg?react';
import { genExtensionMessageByInquireType } from '@utils/inquireTypeUtils';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import AddIcon from '@assets/icons/addIcon.svg?react';
import { useChatStore } from '@store/useChatContext';
// import QueryAssistIcon from '@assets/icons/queryassistIcon.svg?react';

type CNodeProps = TChatMessageTree & {};
const CNode = (chatNode: CNodeProps) => {
	const { t } = useTranslation();
	const { userData } = useUserStore();
	const { setSyncMessage } = useChatStore();
	const [isShowExtension, setIsShowExtension] = React.useState(true);

	const checkIsTyping = (node: TChatMessageTree) => {
		if (node.status === 'PROCESS') {
			return true;
		}
		return false;
	};

	const genExtensionContent = (node: TChatMessageTree) => {
		if (node.extensionInfo) {
			const extensionOptions = genExtensionMessageByInquireType(
				node.extensionInfo,
				!node.content.includes('there is no BO')
			);
			return extensionOptions.length ? (
				<Styled.ExtensionBlock>
					<Styled.ExtensionTitle>
						{t('You may also want to know...')}
					</Styled.ExtensionTitle>
					{extensionOptions.map((ext, idx) => (
						<Styled.ExtensionWrapper
							key={uuidv4()}
							onClick={() => {
								setSyncMessage(ext.content);
								setIsShowExtension(false);
							}}
						>
							<Styled.ExtensionText>
								{idx + 1}. {ext.title}
							</Styled.ExtensionText>
							<Icon component={AddIcon} />
						</Styled.ExtensionWrapper>
					))}
				</Styled.ExtensionBlock>
			) : null;
		}
	};

	return (
		<Fragment key={chatNode.id}>
			{
				//  User問題列
				chatNode.role === 'user' && (
					<Styled.ChatBlock>
						<div style={{ width: '15%' }} />
						<Styled.QuestionLine>
							<Styled.QuestionContain
								style={chatNode.edit ? { width: '100%' } : {}}
							>
								<Styled.QuestionText>
									<Typography.Paragraph
										style={{
											marginBottom: '0',
										}}
									>
										<Styled.PreContain>
											{chatNode.content}
										</Styled.PreContain>
									</Typography.Paragraph>
									<div
										style={{
											height: '45px',
											paddingRight: '12px',
										}}
									/>
								</Styled.QuestionText>
							</Styled.QuestionContain>
						</Styled.QuestionLine>
						<Styled.QuestionAvatar>
							{/* User頭像 */}
							<Styled.UserHeadBlock>
								<Avatar
									size={38}
									style={{
										background: Colors.company_name_blue_1,
										marginLeft: '5px',
									}}
								>
									{userData?.name.slice(0, 1)}
								</Avatar>
							</Styled.UserHeadBlock>
						</Styled.QuestionAvatar>
					</Styled.ChatBlock>
				)
			}
			{
				//  GPT回覆列
				chatNode?.role === 'assistant' && (
					<Styled.ChatBlock>
						<Styled.AnsAvatar>
							{/* GPT頭像 */}
							<Styled.GPTHeadBlock>
								{/* <Icon
									component={COMPANY_NAME_GPT_BODY}
									style={{ fontSize: '38px' }}
								/> */}
							</Styled.GPTHeadBlock>
						</Styled.AnsAvatar>
						<Styled.AnsBlock>
							<Styled.AnsText>
								{checkIsTyping(chatNode) ? (
									<Icon component={TYPING} />
								) : (
									<div
										style={{
											width: '100%',
											display: 'flex',
										}}
									>
										<div
											data-color-mode="dark"
											style={{ width: '100%' }}
										>
											<GlobalStyled.MDPreview
												source={escapeMarkdownSymbols(
													chatNode.content || ''
												)}
												rehypePlugins={[
													[
														rehypeExternalLinks,
														{
															target: '_blank',
														},
													],
												]}
											/>
										</div>
									</div>
								)}
							</Styled.AnsText>
							{checkIsTyping(chatNode) ||
							!chatNode.extensionInfo ||
							!isShowExtension
								? null
								: genExtensionContent(chatNode)}
						</Styled.AnsBlock>
						<div style={{ width: '15%' }} />
					</Styled.ChatBlock>
				)
			}
		</Fragment>
	);
};

type DataProps = {
	chatList: TTreeList;
	selectedPlugin?: string;
	isCloseSideBar?: boolean;
	setIsCloseSideBar?: React.Dispatch<React.SetStateAction<boolean>>;
};

type ChattingNodeProps = DataProps & {};
const ChattingNode = (props: ChattingNodeProps) => {
	const { chatList } = props;

	return chatList
		? chatList.map((chatNode) => <CNode key={chatNode.id} {...chatNode} />)
		: null;
};

const ChatingRoomTree = (props: DataProps) => {
	const { chatList, isCloseSideBar, setIsCloseSideBar } = props;
	return (
		<Styled.ChatContainer>
			<>
				<Styled.FloatModel>
					{isCloseSideBar && (
						<Styled.OpenSideBarBtn
							icon={
								<Icon
									component={OPEN_ICON}
									style={{ fontSize: '24px' }}
								/>
							}
							onClick={() => {
								if (setIsCloseSideBar) {
									setIsCloseSideBar(!isCloseSideBar);
								}
							}}
						/>
					)}
				</Styled.FloatModel>
				<div style={{ marginTop: '50px' }}>
					{chatList && chatList.length > 0 ? (
						<ChattingNode {...props} />
					) : chatList && chatList.length === 0 ? (
						<>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
								}}
							>
								<div />
								<Styled.initialBlock>
									{/* <Icon
										component={QueryAssistIcon}
										style={{
											width: '99px',
											fontSize: '112px',
											height: '112px',
										}}
									/> */}
									<div style={{ marginLeft: '24px' }}>
										<Styled.initialTitle>
											{`Welcome to QueryAssist!`}
										</Styled.initialTitle>
										<Styled.initialText>
											{`All your questions shall find their answers...`}
										</Styled.initialText>
									</div>
								</Styled.initialBlock>
							</div>
						</>
					) : (
						<Styled.ResultBlock>
							<ResultImg
								status="404"
								title="No Data"
								subTitle="This conversation does not contain any data. If you have any questions, please contact the system administrator."
							/>
						</Styled.ResultBlock>
					)}
				</div>
			</>
		</Styled.ChatContainer>
	);
};

export default ChatingRoomTree;
