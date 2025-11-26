import { Tooltip } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';
import {
	AudioFilled,
	PlayCircleFilled,
	PauseCircleFilled,
} from '@ant-design/icons';
import { useUserStore } from '@store/useUserContext';
import { SYSTEM_OPTION } from '@constants';
import { SPEAK_MODE } from '@constants/enum';
import MicLoading from '@assets/icons/waiting_s.json';
import MicListen from '@assets/icons/circle_s.json';
import * as Styled from './Style';

const azureConfig = {
	ENDPOINT: SYSTEM_OPTION.SPEECH_ENDPOINT,
	KEY: SYSTEM_OPTION.SPEECH_KEY,
};

enum RECOG_TYPE {
	REALTIME = 'realTime',
	FINAL = 'final',
	NULL = 'null',
}

type PropsType = {
	content: string;
	speechMode?: boolean;
	setSpeechMode?: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetSpeechMessage: (recordContent: any) => void;
	handleSendButton: () => void;
	setOpenSpeaking?: React.Dispatch<React.SetStateAction<SPEAK_MODE | ''>>;
	openSpeaking?: string;
	disabled: boolean;
	streamStatus?: string;
	setStreamStatus?: React.Dispatch<React.SetStateAction<string>>;
};

const SpeechSynthesis: React.FC<PropsType> = ({
	content,
	speechMode,
	setSpeechMode,
	handleSetSpeechMessage,
	handleSendButton,
	setOpenSpeaking,
	openSpeaking,
	disabled,
	streamStatus,
}) => {
	// ---react speech-kit說話模式相關state設定---
	const { t } = useTranslation();
	const [pitch] = useState(1); // 預設音調
	const [rate] = useState(1); // 預設語速
	const appStore = useUserStore();
	const { locale } = appStore; // locale = zh-TW or en-US
	const [sayContent, setSayContent] = useState<string | null>(null); // Synthesis處理語音工具輸出的文字，handleSetSpeechMessage是將輸出的文字更新到父層的form表單
	const [myStopTimer, setMyStopTimer] = useState<NodeJS.Timeout | null>(null); // 計時器：語音辨識3秒沒有聽到就停止
	const [speechContent, setSpeechContent] = useState<string[]>([]); // 哥倫布說話的文字內容
	const [useVoice, setUseVoice] = useState<any>(null); // 語音說話模式的語音
	// ---AI speech recognition 相關state設定---
	const [, setRecognizingType] = useState<RECOG_TYPE>(RECOG_TYPE.NULL); // 判斷目前是即時輸出或最終輸出
	const [recognisingText, setRecognisingText] = useState(''); // 即時輸出的文字
	const [finalrecognisingText, setFinalRecognisingText] = useState<string[]>(
		[]
	); // 最終輸出的文字
	const recognizerRef = useRef<SpeechSDK.SpeechRecognizer | null>(null);
	let recognizer: SpeechSDK.SpeechRecognizer;

	// react speech-kit 收音的設定
	const { stop } = useSpeechRecognition({
		onResult: (result: any) => {
			console.log('收音 onResult result', result);
			handleSetSpeechMessage(result);
			setSayContent(result);
		},
		onEnd: (result: any) => {
			console.log('收音 onEnd', result);
		},
		onError: (result: any) => {
			if (result.error === 'not-allowed') {
				window.alert('Please allow microphone access');
			} else {
				console.log(result.error);
			}
		},
	});

	// 哥倫布說話的輸出設定
	const { speak, voices, cancel, speaking } = useSpeechSynthesis({
		onEnd: () => {
			console.log('哥倫布說 onEnd', speechContent);
		},
		onError: (result: any) => {
			console.log('哥倫布說 onError', result);
		},
	});

	// 設定哥倫布說話模式的語音參數
	const handleVoice = () => {
		let findVoice;
		for (let vIndex = 0; vIndex < voices.length; vIndex += 1) {
			if (/Edg/.test(navigator.userAgent)) {
				// MS Edge專用
				console.log('MS Edge專用');
				if (
					(locale === 'zh-TW' &&
						voices[vIndex].name ===
							'Microsoft Yating - Chinese (Traditional, Taiwan)') ||
					(locale === 'en-US' &&
						voices[vIndex].name ===
							'Microsoft Aria Online (Natural) - English (United States)')
				) {
					findVoice = voices[vIndex];
					break;
				}
			} else if (/Chrome/.test(navigator.userAgent)) {
				// Chrome 專用
				console.log('Chrome 專用', locale);
				if (
					(locale === 'zh-TW' &&
						voices[vIndex].name === 'Google 國語（臺灣）') ||
					(locale === 'en-US' &&
						voices[vIndex].name === 'Google US English')
				) {
					findVoice = voices[vIndex];
					break;
				}
			}
		}
		// 如果都沒有就用lan找
		if (!findVoice) {
			findVoice = voices.find((item: any) => item.lang === locale);
		}
		return findVoice;
	};

	// 過濾哥倫布說話的文字內容
	const handleSplitContent = (str: string) => {
		const urlRegex = new RegExp(/\((https?:\/\/[^\s]+)\)/g);
		const splitRegex = new RegExp(/(?:\n|。|，|？|!|\?|：|、|\.|<br>)/);
		const newStr = str.replaceAll(urlRegex, '');
		const result = newStr
			.split(splitRegex)
			.map((s) => s.trim())
			.filter((s) => s != '');
		return result;
	};

	// 開啟語音辨識
	const handleRecognition = async () => {
		try {
			const result = await checkAudioAuth();
			if (!result) {
				return;
			}
			if (!speechMode && setSpeechMode) {
				setSpeechMode(true);
			}
			let findVoice;
			if (!useVoice) {
				findVoice = handleVoice();
				setUseVoice(findVoice);
			}

			if (SYSTEM_OPTION.AI_SPEECH_ENABLE) {
				setRecognisingText('');
				setFinalRecognisingText([]);
				if (recognizer && recognizerRef !== null)
					await stopRecognizer();
				startRecognizer();
				if (setOpenSpeaking) {
					setOpenSpeaking(SPEAK_MODE.LISTEN);
				}
			} else {
				// listen({ lang: locale, interimResults: false });
				if (setOpenSpeaking) {
					setOpenSpeaking(SPEAK_MODE.LISTEN);
				}
			}
		} catch (err) {
			window.alert('Please allow microphone access');
			return err;
		}
	};

	// 自動送出user說的話
	const handleStopRecognition = () => {
		if (SYSTEM_OPTION.AI_SPEECH_ENABLE) {
			stopRecognizer();
		} else {
			stop();
		}
		handleSendButton();
		if (setOpenSpeaking) {
			setOpenSpeaking(SPEAK_MODE.LOADING);
		}
	};

	// 手動讓哥倫布停止朗讀
	const handleStopAnswerSpeech = () => {
		cancel();
		if (!SYSTEM_OPTION.AI_SPEECH_ENABLE) {
			stop();
		}
		if (setOpenSpeaking) {
			setOpenSpeaking('');
		}
		setSpeechContent([]);
	};

	// AI speech recognition開始收音辨識
	const startRecognizer = async () => {
		try {
			const speechConfig = SpeechSDK.SpeechConfig.fromEndpoint(
				new URL(azureConfig.ENDPOINT || ''),
				azureConfig.KEY
			);
			speechConfig.speechRecognitionLanguage = locale;
			const audioConfig =
				SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
			recognizer = new SpeechSDK.SpeechRecognizer(
				speechConfig,
				audioConfig
			);
			recognizerRef.current = recognizer;
			console.log('AI speech建立成功:', recognizer);

			recognizer.startContinuousRecognitionAsync();

			recognizer.recognizing = (_s, e) => {
				if (
					e.result.reason === SpeechSDK.ResultReason.RecognizingSpeech
				) {
					if (openSpeaking === SPEAK_MODE.LISTEN) {
						console.log('即時輸出: ', e.result.text);
						setRecognizingType(RECOG_TYPE.REALTIME);
						setRecognisingText(e.result.text);
					}
				}
			};

			recognizer.recognized = (_s, e) => {
				if (
					e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech
				) {
					console.log('最終輸出: ', e.result.text);
					setRecognizingType((prev) => {
						if (prev === RECOG_TYPE.FINAL) {
							// 重複辨識最終輸出，就不計算第二次
							return prev;
						}
						setRecognisingText(e.result.text);
						setFinalRecognisingText((preValue) => {
							if (preValue.includes(e.result.text)) {
								return preValue;
							}
							return [...preValue, e.result.text];
						});
						return RECOG_TYPE.FINAL;
					});
				} else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
					recognizer.stopContinuousRecognitionAsync();
					console.log('No speech could be recognized.');
					stopRecognizer();
				}
			};

			recognizer.canceled = (_s, e) => {
				recognizer.stopContinuousRecognitionAsync();
				console.error(`CANCELED: Reason=${e.reason}`);
				if (e.reason === SpeechSDK.CancellationReason.Error) {
					console.error(`CANCELED: ErrorCode=${e.errorCode}`);
					console.error(`CANCELED: ErrorDetails=${e.errorDetails}`);
				}
			};

			recognizer.sessionStopped = () => {
				recognizer.stopContinuousRecognitionAsync();
			};
		} catch (error) {
			console.error('Error starting recognizer:', error);
		}
	};

	// AI speech recognition停止收音辨識，關閉麥克風
	const stopRecognizer = () => {
		try {
			if (recognizerRef?.current) {
				recognizerRef?.current.stopContinuousRecognitionAsync();
				recognizerRef?.current.close(
					() => {
						console.log('Closed Mic Successfully');
					},
					(error) => {
						console.error('Closed Mic Failed', error);
					}
				);
				recognizerRef.current = null;
			}
		} catch (error) {
			console.error('Close recognizer error', error);
		}
	};

	// AI speech recognition收音辨識的即時文字顯示，須加入最終文字的組合判斷
	useEffect(() => {
		if (speechMode) {
			let str = '';
			if (finalrecognisingText.length > 0) {
				str = `${finalrecognisingText.join('')}${
					!finalrecognisingText.includes(recognisingText)
						? recognisingText
						: ''
				}`;
			} else {
				str = recognisingText;
			}
			handleSetSpeechMessage(str);
			setSayContent(recognisingText);
		}
	}, [recognisingText]);

	// AI speech recognition收音辨識的最終文字顯示
	useEffect(() => {
		if (finalrecognisingText.length > 1 && speechMode) {
			handleSetSpeechMessage(finalrecognisingText.join(''));
			setSayContent(finalrecognisingText.join(''));
		}
	}, [finalrecognisingText]);

	// AI speech 檢查麥克風權限
	const checkAudioAuth = () =>
		new Promise((resolve, reject) => {
			if (SYSTEM_OPTION.AI_SPEECH_ENABLE) {
				if (
					navigator.mediaDevices &&
					navigator.mediaDevices.getUserMedia
				) {
					navigator.mediaDevices
						.getUserMedia({ audio: true })
						.then(() => {
							console.log('mic access enabled');
							resolve(true);
						})
						.catch((err) => {
							console.log('mic access: ', err);
							reject(false);
						});
				} else {
					console.log(
						'getUserMedia is not supported in this browser.'
					);
					reject(false);
				}
			}
		});

	// 根據content跟streamStatus來判斷哥倫布是否要開始說話
	useEffect(() => {
		if (content && streamStatus === 'completed' && speechMode) {
			const contentArray = handleSplitContent(content);
			const getFirstSentence = contentArray.splice(0, 1);
			// 取消上一次發聲，避免讀到空字串而卡住
			cancel();
			speak({ text: getFirstSentence, voice: useVoice, rate, pitch });
			setSpeechContent(contentArray);
		}
	}, [content, streamStatus]);

	// 語音辨識3秒沒有聽到就停止
	useEffect(() => {
		if (sayContent && speechMode) {
			if (myStopTimer) {
				clearTimeout(myStopTimer);
			}
			setMyStopTimer(
				setTimeout(() => {
					console.log('要執行3秒沒有聽到就停止並送出');
					handleStopRecognition();
				}, 3000)
			);
		}
	}, [sayContent]);

	// 判斷是否要停止語音說話模式或是繼續說下一句
	useEffect(() => {
		const r = setInterval(() => {
			if (!window.speechSynthesis.speaking) {
				clearInterval(r);
			} else {
				window.speechSynthesis.pause();
				window.speechSynthesis.resume();
			}
		}, 14000);
		if (speechMode) {
			if (!speaking) {
				if (speechContent.length > 0) {
					const tempContent = [...speechContent];
					speak({
						text: tempContent.splice(0, 1),
						voice: useVoice,
						rate,
						pitch,
					});
					setSpeechContent(tempContent);
				} else if (openSpeaking) {
					// 分辨是自動念完停 or 手動停止
					handleRecognition();
				}
			} else {
				if (setOpenSpeaking) {
					setOpenSpeaking(SPEAK_MODE.SPEAK);
				}
			}
		}
	}, [window.speechSynthesis.speaking]);

	// 如果語言改變就重新設定語音
	useEffect(() => {
		if (useVoice && locale !== useVoice?.lang) {
			const newLang = handleVoice();
			setUseVoice(newLang);
		}
	}, [locale]);

	// 判斷是否要開啟語音辨識
	useEffect(() => {
		if (speechMode && !openSpeaking) {
			handleStopAnswerSpeech();
		} else if (speechMode && openSpeaking === SPEAK_MODE.LISTEN) {
			handleRecognition();
		}
	}, [openSpeaking]);

	// 語音辨識的icon顯示及對應的功能
	const renderSpeechAction = () => {
		let actionBlock = null;
		if (speechMode && openSpeaking === SPEAK_MODE.LISTEN) {
			// 聆聽中
			actionBlock = (
				<Tooltip placement="top" title={t('停止聆聽')}>
					<div
						style={{
							verticalAlign: 'text-top',
							width: '72px',
							position: 'absolute',
							right: '33px',
							top: '-24px',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Lottie
								animationData={MicListen}
								style={{ height: 71 }}
							/>
							<Styled.MicIconBtnActive
								style={{
									position: 'absolute',
									marginRight: '1px',
								}}
								icon={
									<AudioFilled style={{ fontSize: '19px' }} />
								}
								onClick={() => {
									// 關閉聆聽
									if (SYSTEM_OPTION.AI_SPEECH_ENABLE) {
										stopRecognizer();
										setSayContent(null);
									} else {
										stop();
									}
									if (setSpeechMode) {
										setSpeechMode(false);
									}
									if (myStopTimer) {
										clearTimeout(myStopTimer);
									}
								}}
							/>
						</div>
					</div>
				</Tooltip>
			);
		} else if (speechMode && openSpeaking === SPEAK_MODE.SPEAK) {
			// 哥倫布說話時
			actionBlock = (
				<Tooltip placement="top" title={t('暫停')}>
					<Styled.MicIconBtn
						style={{ verticalAlign: 'text-top' }}
						icon={
							<PauseCircleFilled
								style={{ fontSize: '19px', color: 'white' }}
							/>
						}
						onClick={() => {
							handleStopAnswerSpeech();
						}}
					/>
				</Tooltip>
			);
		} else if (speechMode && openSpeaking === SPEAK_MODE.LOADING) {
			// 搜尋中
			actionBlock = (
				<Lottie
					animationData={MicLoading}
					style={{ height: 30, marginRight: '-9px' }}
				/>
			);
		} else if (speechMode && !openSpeaking) {
			actionBlock = (
				<Tooltip placement="top" title={t('繼續')}>
					<Styled.MicIconBtn
						style={{ verticalAlign: 'text-top' }}
						icon={
							<PlayCircleFilled
								style={{ fontSize: '19px', color: 'white' }}
							/>
						}
						onClick={() => {
							handleRecognition();
						}}
					/>
				</Tooltip>
			);
		} else if (disabled) {
			// 禁用麥克風
			actionBlock = (
				<Styled.MicIconBtnDisabled
					style={{ verticalAlign: 'text-top', cursor: 'not-allowed' }}
					icon={<AudioFilled style={{ fontSize: '19px' }} />}
				/>
			);
		} else {
			// 聆聽狀態麥克風
			actionBlock = (
				<Tooltip placement="top" title={t('啟用語音')}>
					<Styled.MicIconBtn
						style={{ verticalAlign: 'text-top' }}
						icon={<AudioFilled style={{ fontSize: '19px' }} />}
						onClick={() => {
							handleRecognition();
						}}
					/>
				</Tooltip>
			);
		}
		return actionBlock;
	};

	return <div>{renderSpeechAction()}</div>;
};

export default SpeechSynthesis;
