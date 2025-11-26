import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalContext } from '@store/appStore';
import { Spin } from 'antd';
import { useUserStore } from '@/store/useUserContext';

const App: React.FC = () => {
	const { isLoading } = useContext(GlobalContext);
	const { isLogin } = useUserStore();

	return (
		isLogin() && (
			<>
				{isLoading && (
					<div>
						<Spin />
					</div>
				)}
				<Outlet />
			</>
		)
	);
};

export default App;
