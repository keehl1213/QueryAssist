import { Spin, SpinProps } from 'antd';
import { Container } from './Style';

const Loading: React.FC<SpinProps> = ({ children, spinning, ...props }) => {
	return (
		<Container>
			{children}
			{spinning && (
				<div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
					<div
						className={`
                        scale-[1.5]
                        before:content-[' ']
                        before:block
                        before:absolute
                        before:top-[-50%]
                        before:left-[-50%]
                        before:w-[120px]
                        before:h-[120px]
                        before:bg-gray-800
                        before:translate-x-[-26px]
                        before:translate-y-[-26px]
                        before:rounded-[5px]`}
					>
						<div className="">
							<Spin size="large" spinning={true} {...props} />
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};

export default Loading;
