import { Form } from 'antd';
import { LoginButton } from '@/components/compose';
import { Container, LoginCard } from './Style';
// import bigLogo from '@assets/images/queryassistBigLogo.jpg';
// import logo from '@assets/images/queryassistLogo.svg';

const Login = () => {
	return (
		<Container>
			<Form>
				<div className="flex flex-col items-center">
					<LoginCard
						classNames={{ body: 'flex flex-col items-center' }}
						// cover={<img src={bigLogo} />}
					>
						{/* <img src={logo} className="mb-[16px]" /> */}
						<LoginButton />
						<div className="text-[12px] text-[#000000D9] mt-[32px] opacity-60">
							Copyright @ 2023 COMPANY_NAME CORPORATION , Version:
							1.19.5-241018
						</div>
					</LoginCard>
				</div>
			</Form>
		</Container>
	);
};

export default Login;
