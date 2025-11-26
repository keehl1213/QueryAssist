import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from '@router/router';
import AppContextProvider from '@store/appStore';
import MsalContextProvider from '@store/useMsalContext';
import UserContextProvider from '@store/useUserContext';
import * as msal from '@azure/msal-browser';
import { MsalConfig } from '@/utils/msalAuth';
import { ConfigProvider, ThemeConfig } from 'antd';
import { I18nextProvider } from 'react-i18next';
import Color from '@styles/color';
import i18n from './locales/i18n';
// import {
// 	MatomoProvider,
// 	createInstance,
// 	useMatomo,
// } from '@mitresthen/matomo-tracker-react';
import './index.css';

const theme: ThemeConfig = {
	components: {
		Spin: {
			contentHeight: 'none',
		},
		Button: {
			defaultHoverColor: Color.gpt_black_3,
		},
		Form: {
			labelColor: Color.white_1,
			labelRequiredMarkColor: '#FF5E5E',
		},
	},
	token: {
		colorTextPlaceholder: '#9ca3af',
		colorPrimary: 'white',
		// 優先使用自定義字體，沒有的話再根據Antd建議順序https://ant.design/docs/spec/font
		fontFamily:
			"Noto Sans TC, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'",
	},
};

export const msalInstance = new msal.PublicClientApplication(MsalConfig);

// const matomoInstance = createInstance({
// 	urlBase: import.meta.env.VITE_MATOMO_URL,
// 	siteId: Number.parseInt(import.meta.env.VITE_MATOMO_SITE_ID || ''),
// 	linkTracking: false,
// });

const Main: React.FC = () => {
	// const { enableLinkTracking, trackPageView } = useMatomo();
	// const { userData } = useUserStore();
	// enableLinkTracking();

	// const matomoTrackPage = () => {
	// 	// localhost & qas 環境不追蹤Matomo資訊
	// 	if (
	// 		window.location.href.includes('localhost') ||
	// 		window.location.href.includes('queryassist-qas')
	// 	)
	// 		return;

	// 	const splitPage = window.location.pathname.split('/');
	// 	if (splitPage.length > 2) {
	// 		matomoInstance.pushInstruction('setUserId', userData?.email);
	// 		matomoInstance.pushInstruction(
	// 			'setCustomDimension',
	// 			1,
	// 			userData?.deptId
	// 		);
	// 		trackPageView({
	// 			documentTitle: splitPage[2], // optional
	// 			href: window.location.href, // optional
	// 		});
	// 	}
	// };

	// useEffect(() => {
	// 	if (userData?.email) {
	// 		matomoTrackPage();
	// 	}
	// }, [window.location.href, userData]);

	return <Router />;
};

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppContextProvider>
			<MsalContextProvider>
				<I18nextProvider i18n={i18n}>
					<UserContextProvider>
						<ConfigProvider theme={theme}>
							{/* <MatomoProvider value={matomoInstance}> */}
							<Main />
							{/* </MatomoProvider> */}
						</ConfigProvider>
					</UserContextProvider>
				</I18nextProvider>
			</MsalContextProvider>
		</AppContextProvider>
	</StrictMode>
);
