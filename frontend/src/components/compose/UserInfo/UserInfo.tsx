import { useTranslation } from 'react-i18next';
import { MoreOutlined, ExportOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
import Colors from '@styles/color';
import * as Styled from './Style';
import { useUserStore } from '@store/useUserContext';
import { azureLogout } from '@requests/azureRequests';

type DataType = {
	isCloseSideBar?: boolean;
};

const UserInfo = ({ isCloseSideBar }: DataType) => {
	const { t } = useTranslation();
	const { userData } = useUserStore();

	const handleLogout = async () => {
		await azureLogout(userData?.id || '');

		localStorage.clear();
		sessionStorage.clear();
		// 如為緯創AAD帳號，使用microsoft的oauth登出url再redirect回ev首頁
		let redirectUrl = '';
		if (window.location.host.includes('localhost')) {
			redirectUrl = 'http://localhost:8080';
		} else {
			redirectUrl = `https://${window.location.host}/`;
		}
		const url = `https://login.microsoftonline.com/company_name.com/oauth2/logout?post_logout_redirect_uri=${redirectUrl}`;
		window.location.href = url;
	};

	const USER_SETTING = (
		<div style={{ width: '250px', background: Colors.gpt_black_5 }}>
			<Styled.InfoButton
				bgColor={Colors.gpt_black_5}
				icon={<ExportOutlined style={{ marginRight: '5px' }} />}
				data-testid="logout-btn"
				onClick={handleLogout}
			>
				{t('登出')}
			</Styled.InfoButton>
		</div>
	);

	return (
		<>
			<Styled.DividerLine />
			<Styled.Contain>
				<Popover
					content={USER_SETTING}
					placement="right"
					trigger="click"
					color={Colors.gpt_black_5}
					arrow={false}
					overlayInnerStyle={{ padding: '0' }}
				>
					{isCloseSideBar ? null : (
						<Styled.InfoButton>
							<Styled.UserBtnContain>
								<Styled.IconText>
									<Avatar
										style={{
											color: Colors.gpt_white_1,
											background:
												Colors.company_name_blue_1,
											marginRight: '8px',
										}}
									>
										{(userData?.name || '')?.slice(0, 1)}
									</Avatar>
									<span
										style={{
											width: '162px',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											display: 'inline-block',
										}}
									>
										{userData?.name || ''}
									</span>
								</Styled.IconText>
								<MoreOutlined rotate={90} />
							</Styled.UserBtnContain>
						</Styled.InfoButton>
					)}
				</Popover>
			</Styled.Contain>
		</>
	);
};

export default UserInfo;
