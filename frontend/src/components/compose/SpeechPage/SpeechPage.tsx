import { useTranslation } from 'react-i18next';
// import QUERYASSIST from '@assets/icons/queryassist.svg?react';
import Lottie from 'lottie-react';
import botSpeakingAnimation from '@assets/icons/speaking_b2.json';
import userListening from '@assets/icons/listening_b.json';
import botLoading from '@assets/icons/waiting_b.json';
import {
	CloseCircleOutlined,
	PauseCircleOutlined,
	PlayCircleOutlined,
} from '@ant-design/icons';
import { SPEAK_MODE } from '@constants/enum';
import * as Styled from './Style';

type PropsType = {
	mode?: SPEAK_MODE | '';
	setOpenSpeaking?: React.Dispatch<React.SetStateAction<SPEAK_MODE | ''>>;
	setSpeechMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpeechPage: React.FC<PropsType> = ({
	mode,
	setOpenSpeaking,
	setSpeechMode,
}) => {
	const { t } = useTranslation();
	// listen speak loading
	if (mode === SPEAK_MODE.SPEAK) {
		return (
			<Styled.BlockBackground>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '78%',
					}}
				>
					{/* <Icon
						component={QUERYASSIST}
						style={{
							fontSize: '110px',
							position: 'absolute',
						}}
					/> */}
					<Lottie
						animationData={botSpeakingAnimation}
						style={{ height: 388 }}
					/>
					<div
						style={{
							color: 'white',
							position: 'absolute',
							top: '56%',
						}}
					>
						{/* 暫停哥倫布說話 */}
						<Styled.CustonButton
							onClick={() =>
								setOpenSpeaking ? setOpenSpeaking('') : null
							}
						>
							<PauseCircleOutlined
								style={{
									verticalAlign: 'text-bottom',
									height: '16px',
								}}
							/>
							<div
								style={{
									marginLeft: '4px',
									display: 'inline-block',
								}}
							>
								{t('暫停')}
							</div>
						</Styled.CustonButton>
						{/* 結束語音模式 */}
						<Styled.CustonButton
							style={{ marginLeft: '11px' }}
							onClick={() => {
								if (setOpenSpeaking) {
									setOpenSpeaking('');
								}
								if (setSpeechMode) {
									setSpeechMode(false);
								}
							}}
						>
							<CloseCircleOutlined
								style={{
									verticalAlign: 'text-bottom',
									height: '16px',
								}}
							/>
							<div
								style={{
									marginLeft: '4px',
									display: 'inline-block',
								}}
							>
								{t('結束')}
							</div>
						</Styled.CustonButton>
					</div>
				</div>
			</Styled.BlockBackground>
		);
	}
	if (mode === SPEAK_MODE.LOADING) {
		return (
			<Styled.BlockBackground>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '78%',
					}}
				>
					{/* <Icon
						component={QUERYASSIST}
						style={{
							fontSize: '110px',
							position: 'absolute',
						}}
					/> */}
					<Lottie
						animationData={botLoading}
						style={{ height: 250 }}
					/>
					<div
						style={{
							color: 'white',
							position: 'absolute',
							top: '56%',
						}}
					>
						{t('搜尋答案中')}
					</div>
				</div>
			</Styled.BlockBackground>
		);
	}
	if (mode === SPEAK_MODE.LISTEN) {
		return (
			<Styled.BlockBackground>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '78%',
					}}
				>
					{/* <Icon
						component={QUERYASSIST}
						style={{
							fontSize: '110px',
							position: 'absolute',
						}}
					/> */}
					<Lottie
						animationData={userListening}
						style={{ height: 388 }}
					/>
					<div
						style={{
							color: 'white',
							position: 'absolute',
							top: '56%',
						}}
					>
						{t('正在聆聽您的問題')}
					</div>
				</div>
			</Styled.BlockBackground>
		);
	}
	return (
		// mode === 'stop'
		<Styled.BlockBackground>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '78%',
				}}
			>
				{/* <Icon
					component={QUERYASSIST}
					style={{
						fontSize: '110px',
						position: 'absolute',
					}}
				/> */}
				<Lottie
					animationData={botSpeakingAnimation}
					style={{ height: 388 }}
				/>
				<div
					style={{ color: 'white', position: 'absolute', top: '56%' }}
				>
					{/* 按暫停後的繼續開啟語音模式 */}
					<Styled.CustonButton
						onClick={() =>
							setOpenSpeaking
								? setOpenSpeaking(SPEAK_MODE.LISTEN)
								: null
						}
					>
						<PlayCircleOutlined
							style={{
								verticalAlign: 'text-bottom',
								height: '16px',
							}}
						/>
						<div
							style={{
								marginLeft: '4px',
								display: 'inline-block',
							}}
						>
							{t('繼續')}
						</div>
					</Styled.CustonButton>
					<Styled.CustonButton
						style={{ marginLeft: '11px' }}
						onClick={() => {
							if (setOpenSpeaking) {
								setOpenSpeaking('');
							}
							if (setSpeechMode) {
								setSpeechMode(false);
							}
						}}
					>
						<CloseCircleOutlined
							style={{
								verticalAlign: 'text-bottom',
								height: '16px',
							}}
						/>
						<div
							style={{
								marginLeft: '4px',
								display: 'inline-block',
								height: '16px',
							}}
						>
							{t('結束')}
						</div>
					</Styled.CustonButton>
				</div>
			</div>
		</Styled.BlockBackground>
	);
};

export default SpeechPage;
