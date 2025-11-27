import { useEffect } from 'react';
import {
	SideBar,
	EmptyRoom,
	MessageBar,
	ChatingRoomTreeBinding,
	SpeechPage,
	RightSideBar,
} from '@compose';
import { useState } from 'react';
import * as GlobalStyled from '@styles/globalStyle';
import * as Styled from './Style';
import { Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { getAIBackOrder } from '@requests/agentRequests';
import { useUserStore } from '@store/useUserContext';
import { CHAT_TYPE, SPEAK_MODE } from '@constants/enum';
import ChatContextProvider from '@store/useChatContext';
import { useMatomo } from '@mitresthen/matomo-tracker-react';

// const fakeList: TTreeList = [
// 	{
// 		id: '1',
// 		role: 'user',
// 		content: 'test',
// 	},
// 	{
// 		id: '2',
// 		role: 'assistant',
// 		content: 'test2',
// 	},
// ];

const ChatRoom: React.FC = () => {
	const { userData } = useUserStore();
	const { trackEvent } = useMatomo();
	const [isEmpty, setIsEmpty] = useState(false);
	const [isCloseSideBar, setIsCloseSideBar] = useState(false);
	const [isCloseRightSideBar, setIsCloseRightSideBar] = useState(true);
	const [messageBarHeight, setMessageBarHeight] = useState(0); // 對話框textarea高度，預設為0，等user輸入後會更新高度
	// const [messageText, setMessageText] = useState('');
	const [contentLoading] = useState(false);
	const [messageText] = useState(''); // 預設訊息文字為空，等user輸入後會更新訊息文字
	const [chatList, setChatList] = useState<TTreeList>([]);
	const [selectedPlugin, setSelectedPlugin] = useState('AI_QUERY');
	const [isChatting, setIsChatting] = useState(false);
	const [speechMode, setSpeechMode] = useState(false); // 語音辨識模式
	const [speechContent, setSpeechContent] = useState('');
	const [openSpeaking, setOpenSpeaking] = useState<SPEAK_MODE | ''>(
		SPEAK_MODE.LISTEN
	); // LISTEN 聆聽, SPEAK 講話
	const [streamStatus, setStreamStatus] = useState('completed'); // streaming 狀態是否已完成，避免語音模式下重複說話

	const autoScroll = () => {
		const elem = document.getElementById('text-container');
		if (elem) {
			elem.scrollTop = elem.scrollHeight;
		}
	};

	useEffect(() => {
		autoScroll();
	}, [chatList, contentLoading]);

	useEffect(() => {
		if (selectedPlugin) {
			setIsCloseRightSideBar(false);
		}
	}, [selectedPlugin]);

	const getNewList = (newNodeId: string, content: string) => {
		const newChat = {
			id: newNodeId,
			content,
			role: 'user',
		};
		return chatList.concat(newChat);
	};

	const getErrorMsg = (error: any) => {
		let errorMsg = 'System error';
		if (error?.data?.message && typeof error.data.message === 'string') {
			errorMsg = error?.data?.message;
		} else if (error?.message && typeof error?.message === 'string') {
			errorMsg = error?.message;
		} else if (
			error?.data?.detail?.message &&
			typeof error?.data?.detail?.message === 'string'
		) {
			errorMsg = error?.data?.detail?.message;
		} else if (error?.data && typeof error.data === 'string') {
			errorMsg = error?.data;
		} else if (error?.statusText) {
			errorMsg = error?.statusText;
		}
		return errorMsg;
	};

	const handleSearch = async (data: TSendData, chatType: CHAT_TYPE) => {
		if (Object.keys(data).length) {
			if (isEmpty) {
				setIsEmpty(false);
			}
			if (
				!(
					window.location.href.includes('localhost') ||
					window.location.href.includes('queryassist-qas')
				)
			) {
				trackEvent({
					category: 'Chat Room',
					documentTitle: 'Chat',
					action: chatType,
				});
			}
			const newNodeId = uuidv4();
			const newGPTNodeId = uuidv4();
			const newTree = getNewList(newNodeId, data.message || '');
			setChatList(newTree);
			setIsChatting(true);
			try {
				// GPT回覆
				const newChat = {
					id: newGPTNodeId,
					content: '',
					role: 'assistant',
					status: 'PROCESS',
				};
				newTree.push(newChat);
				setChatList([...newTree]);
				let responseContent = '';
				const result = await getAIBackOrder(data.message || '');
				responseContent = result.data.output;
				const newChatIdx = newTree.findIndex(
					(chat) => chat.id === newGPTNodeId
				);
				newTree[newChatIdx] = {
					...newTree[newChatIdx],
					content: responseContent,
					status: 'DONE',
					extensionInfo: result.data.info,
				};
				// 確保info存在，避免undefined錯誤
				const info = result.data.info || {};
				const { inquireType } = info;
				if (inquireType) {
					// 定義inquireType對應表
					const inquireTypeMapping: Record<string, string> = {
						'01': 'BO',
						'20': 'ETD',
						'21': 'shipment',
						'22': 'E&O accountability',
						'23': 'E&O accountability',
						'24': 'E&O accountability',
						'25': 'E&O accountability',
					};
					const mappedAction =
						inquireTypeMapping[
							inquireType as keyof typeof inquireTypeMapping
						] || inquireType;

					if (
						!(
							window.location.href.includes('localhost') ||
							window.location.href.includes('queryassist-qas')
						)
					) {
						trackEvent({
							category: 'Question Type',
							documentTitle: 'Question Type',
							action: mappedAction, // 傳遞映射後的action值
						});
					}
				}
				setChatList([...newTree]);
				if (speechMode) {
					const newAnswer = newTree.pop() as
						| { content: string }
						| undefined;
					if (newAnswer && newAnswer.content) {
						setSpeechContent(newAnswer.content);
					} else {
						setOpenSpeaking('');
					}
				}
			} catch (error: any) {
				const newChatIdx = newTree.findIndex(
					(chat) => chat.id === newGPTNodeId
				);
				newTree[newChatIdx] = {
					...newTree[newChatIdx],
					content: getErrorMsg(error),
					status: 'DONE',
				};
				setChatList([...newTree]);
				if (speechMode) {
					const newAnswer = newTree.pop() as
						| { content: string }
						| undefined;
					if (newAnswer && newAnswer.content) {
						setSpeechContent(newAnswer.content);
					} else {
						setOpenSpeaking('');
					}
				}
			} finally {
				setIsChatting(false);
			}
		}
	};

	const renderChatContainer = () => {
		const renderContent = () => {
			// 初始空的聊天室
			if (isEmpty) {
				return (
					<EmptyRoom
						isCloseSideBar={isCloseSideBar}
						setIsCloseSideBar={setIsCloseSideBar}
					/>
				);
			}
			// 開始聊天的畫面
			return (
				contentLoading === false && (
					<ChatingRoomTreeBinding
						chatList={chatList}
						selectedPlugin={selectedPlugin}
						isCloseSideBar={isCloseSideBar}
						setIsCloseSideBar={setIsCloseSideBar}
					/>
				)
			);
		};

		return (
			<Styled.ChatTextContainer messageBarHeight={messageBarHeight}>
				{renderContent()}
			</Styled.ChatTextContainer>
		);
	};

	return (
		<ChatContextProvider>
			<div className="relative">
				{speechMode ? (
					<SpeechPage
						mode={openSpeaking}
						setOpenSpeaking={setOpenSpeaking}
						setSpeechMode={setSpeechMode}
					/>
				) : null}
				<Styled.Container>
					<SideBar
						isCloseSideBar={isCloseSideBar}
						setIsCloseSideBar={setIsCloseSideBar}
						handleSelectPlugin={setSelectedPlugin}
						selectedPlugin={selectedPlugin}
					/>
					<div
						style={{
							width: `calc(100% - ${isCloseSideBar ? '0' : '260'}px - ${isCloseRightSideBar ? '0' : '260'}px)`,
						}}
					>
						<Styled.ChatContainer>
							<Spin spinning={contentLoading}>
								<div style={{ height: '100vh' }}>
									<GlobalStyled.ScrollerStyle
										id="text-container"
										style={{
											marginBottom: '10px',
											overflow: 'hidden scroll',
										}}
									>
										{renderChatContainer()}
									</GlobalStyled.ScrollerStyle>
									<Styled.ChatMessageContain
										style={{
											zIndex: speechMode
												? '1100'
												: '1000',
										}}
									>
										{contentLoading === false && (
											<MessageBar
												messageBarHeight={
													messageBarHeight
												}
												setMessageBarHeight={
													setMessageBarHeight
												}
												messageText={messageText}
												selectedPlugin={selectedPlugin}
												handleSearch={handleSearch}
												isChatting={isChatting}
												useAI={userData?.useAI}
												speechContent={speechContent}
												setSpeechMode={setSpeechMode}
												speechMode={speechMode}
												setOpenSpeaking={
													setOpenSpeaking
												}
												openSpeaking={openSpeaking}
												streamStatus={streamStatus}
												setStreamStatus={
													setStreamStatus
												}
											/>
										)}
									</Styled.ChatMessageContain>
								</div>
							</Spin>
						</Styled.ChatContainer>
					</div>
					{!isCloseRightSideBar ? (
						<RightSideBar handleSearch={handleSearch} />
					) : null}
				</Styled.Container>
			</div>
		</ChatContextProvider>
	);
};

export default ChatRoom;
