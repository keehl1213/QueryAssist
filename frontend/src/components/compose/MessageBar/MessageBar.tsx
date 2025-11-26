import React, { useState, useRef, useEffect } from 'react';
import { Tooltip, Dropdown, Form } from 'antd';
import { Button, Input } from '@atoms';
import Colors from '@styles/color';
import * as Styled from './Style';
import SEND_MESSAGE from '@assets/icons/sendMessageIcon.svg?react';
import Icon from '@ant-design/icons';
import { SpeechSynthesis } from '@compose';
import { useTranslation } from 'react-i18next';
import { CHAT_TYPE, SPEAK_MODE } from '@constants/enum';
import { SYSTEM_OPTION } from '@constants';
import { useChatStore } from '@store/useChatContext';
import { useWatch } from 'antd/es/form/Form';

type MsgProps = {
	messageText?: string;
	messageBarHeight: number;
	setMessageBarHeight: React.Dispatch<React.SetStateAction<number>>;
	selectedPlugin?: string;
	handleSearch(data: TSendData, chatType: CHAT_TYPE): void;
	isChatting?: boolean;
	useAI?: boolean;
	speechContent: string;
	setSpeechMode?: React.Dispatch<React.SetStateAction<boolean>>;
	speechMode?: boolean;
	setOpenSpeaking?: React.Dispatch<React.SetStateAction<SPEAK_MODE | ''>>;
	openSpeaking?: string;
	setStreamStatus?: React.Dispatch<React.SetStateAction<string>>;
	streamStatus?: string;
};

const MessageBar = (props: MsgProps) => {
	const {
		messageText,
		setMessageBarHeight,
		selectedPlugin,
		handleSearch,
		isChatting,
		speechContent,
		setSpeechMode,
		speechMode,
		setOpenSpeaking,
		openSpeaking,
		setStreamStatus,
		streamStatus,
	} = props;
	const { t } = useTranslation();
	const [form] = Form.useForm<TSendData>();
	const { syncMessage, setSyncMessage } = useChatStore();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [lightSendBtn, setLightSendBtn] = useState(false);
	// const [showFavoritePrompts] = useState(false);
	const messageInput = useWatch('message', form);

	const checkSendDisable = !selectedPlugin || isChatting || !lightSendBtn;

	useEffect(() => {
		if (syncMessage) {
			const currentMsg = form.getFieldValue('message');
			form.setFieldsValue({
				message: `${currentMsg ? currentMsg : ''}${syncMessage}`,
			});
			setLightSendBtn(true);
			setSyncMessage('');
		}
	}, [syncMessage]);

	const handleSetSpeechMessage = (recordContent: any) => {
		form.setFieldsValue({ message: recordContent });
	};

	const onSearch = (data: TSendData) => {
		if (!selectedPlugin || isChatting || data.message?.trim().length === 0)
			return;
		handleSearch(
			{
				inquireType: data.inquireType,
				region: data.region,
				pn: data.pn?.trim(),
				message: data.message?.trim(),
			},
			speechMode ? CHAT_TYPE.VoiceInput : CHAT_TYPE.ManualInput
		);
		form.resetFields(['message']);
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.shiftKey === false && e.key === 'Enter' && e.keyCode === 13) {
			e.preventDefault(); // 避免focus時換行
			e.stopPropagation();
			form.submit();
		}
	};

	useEffect(() => {
		form.setFieldsValue({ message: messageText });
		if (messageText?.trim() !== '') {
			setLightSendBtn(true);
		}
	}, [messageText]);

	useEffect(() => {
		if (speechMode && messageInput?.trim() !== '') {
			setLightSendBtn(true);
		}
	}, [messageInput]);

	const getTextareaHeightById = () => {
		const textarea = document.getElementById('textareaBlock');
		if (textarea) {
			setMessageBarHeight(textarea.offsetHeight);
		} else {
			setMessageBarHeight(0);
		}
	};

	const hangeValueChange = (changeValue: any) => {
		if (changeValue !== undefined) {
			const changeColumn = Object.keys(changeValue)[0];
			const value = Object.values(changeValue)[0];
			switch (changeColumn) {
				case 'message':
					getTextareaHeightById();
					if (textAreaRef.current) {
						textAreaRef.current.scrollTop =
							textAreaRef.current.scrollHeight;
					}
					setLightSendBtn(!!value);
					break;
				default:
					break;
			}
		}
	};

	return (
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
				<Styled.TextAreaWrapper>
					<Styled.TextAreaContain>
						<Form
							form={form}
							onValuesChange={hangeValueChange}
							onFinish={onSearch}
							style={{
								width: 'calc(100% - 8px)',
								padding: `0px 88px 0px 12px`,
							}}
						>
							<Tooltip placement="top">
								<div
									style={{
										width: '100%',
										margin: '0',
										display: 'flex',
										alignItems: 'center',
									}}
									id="textareaBlock"
								>
									<Dropdown
										className="flex-1"
										menu={{
											items: [],
											onClick: ({ key }) =>
												console.log(key),
											// onSelectPrompt(
											// 	promptDropdownData.find(
											// 		(d) => d.key === key
											// 	)
											// ),
										}}
										// menu={{ items: promptDropdownData, onClick: onSelectPrompt }}
										dropdownRender={(menu) => (
											<Styled.PromptDropdownItem>
												{menu}
											</Styled.PromptDropdownItem>
										)}
										overlayStyle={{ minWidth: 150 }}
										destroyPopupOnHide
									>
										<div>
											<Form.Item
												style={{ width: '50%' }}
												name="message"
												noStyle
											>
												<Input.TextArea
													style={{
														paddingRight: '11px',
														margin: '6px 0px',
													}}
													disabled={
														!selectedPlugin ||
														isChatting
													}
													onKeyDown={(e) =>
														handleEnter(e)
													}
													ref={textAreaRef}
													autoSize={{
														minRows: 1,
														maxRows: 8,
													}}
													variant="borderless"
													size="large"
												/>
											</Form.Item>
										</div>
									</Dropdown>
								</div>
							</Tooltip>
						</Form>
						<div
							style={{
								position: 'absolute',
								right: '0%',
								bottom: '20%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingRight: '16px',
								gap: '8px',
							}}
						>
							{/* 語音問答 */}
							{SYSTEM_OPTION.AI_SPEECH_ENABLE && (
								<Tooltip placement="top" title={t('啟用語音')}>
									<SpeechSynthesis
										disabled={
											!selectedPlugin || !!isChatting
										}
										content={speechContent}
										speechMode={speechMode}
										setSpeechMode={setSpeechMode}
										handleSetSpeechMessage={
											handleSetSpeechMessage
										}
										handleSendButton={form.submit}
										setOpenSpeaking={setOpenSpeaking}
										openSpeaking={openSpeaking}
										streamStatus={streamStatus}
										setStreamStatus={setStreamStatus}
									/>
								</Tooltip>
							)}
							<Styled.SendIcon disableRegen={false}>
								<Button
									bgColor={Colors.gpt_black_4}
									icon={
										<Icon
											style={{
												fontSize: '18px',
												fill: lightSendBtn
													? Colors.white_1
													: Colors.gpt_grey_2,
												padding: '2px 0 0',
											}}
											component={SEND_MESSAGE}
										/>
									}
									onClick={form.submit}
									disabled={checkSendDisable}
								/>
							</Styled.SendIcon>
						</div>
					</Styled.TextAreaContain>
				</Styled.TextAreaWrapper>
				<Styled.VersionBlock />
			</div>
		</>
	);
};

export default MessageBar;
