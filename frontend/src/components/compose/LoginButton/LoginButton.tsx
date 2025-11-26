import Icon from '@ant-design/icons';
import azure from '@assets/images/azure.png';
import { useMsalStore } from '@/store/useMsalContext';
import { useUserStore } from '@/store/useUserContext';
import { loginRequest } from '@/utils/msalAuth';
import { StyledButton } from './Style';

const LoginButton = () => {
	const { setGlobalLoading } = useUserStore();
	const { instance } = useMsalStore();

	// 點擊AAD登入按鈕後會轉跳到AAD登入頁面，登入之後會Redirect回來，之後會再觸發isUserLogin()
	const handleAADLogin = async () => {
		//兩種都是重定向 API
		try {
			setGlobalLoading(true);
			await instance?.acquireTokenRedirect(loginRequest);
		} catch (error: any) {
			console.log(error.message);
			localStorage.clear();
			sessionStorage.clear();
			await instance?.loginRedirect(loginRequest);
		} finally {
			setGlobalLoading(false);
		}
	};

	return (
		<StyledButton onClick={handleAADLogin}>
			<Icon
				component={() => (
					<img src={azure} alt="" className="w-[16px] h-[16px]" />
				)}
			/>
			Log in with Microsoft
		</StyledButton>
	);
};

export default LoginButton;
