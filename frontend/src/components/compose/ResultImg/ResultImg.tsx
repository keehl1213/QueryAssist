import * as Styled from './Style';

type Props = {
	icon?: any;
	status?: any;
	title?: string;
	subTitle?: string;
	extra?: any;
	theme?: string;
};

const ResultImg = ({ theme, icon, status, title, subTitle, extra }: Props) => {
	return (
		<Styled.ResultStyle
			theme={theme || ''}
			icon={icon}
			status={status}
			title={title}
			subTitle={subTitle}
			extra={extra}
		/>
	);
};

export default ResultImg;
