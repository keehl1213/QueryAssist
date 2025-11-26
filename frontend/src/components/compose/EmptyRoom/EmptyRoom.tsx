import React from 'react';
import OPEN_ICON from '@assets/icons/openIcon.svg?react';
import * as Styled from './Style';
import Icon from '@ant-design/icons';

type DataProps = {
	isCloseSideBar: boolean;
	setIsCloseSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmptyRoom = ({ isCloseSideBar, setIsCloseSideBar }: DataProps) => {
	return (
		<>
			<div style={{ display: 'flex', margin: '16px 0px 0px 16px' }}>
				{isCloseSideBar && (
					<Styled.OpenSideBarBtn
						icon={
							<Icon
								component={OPEN_ICON}
								style={{ fontSize: '24px' }}
							/>
						}
						onClick={() => {
							setIsCloseSideBar(!isCloseSideBar);
						}}
					/>
				)}
			</div>
		</>
	);
};

export default EmptyRoom;
