import React from 'react';
import Colors from '@/styles/color';
import * as Styled from './Style';
import { useTranslation } from 'react-i18next';
import { ThunderboltOutlined } from '@ant-design/icons';
import { Select, Input } from '@atoms';
import { Form, Space, ConfigProvider } from 'antd';
// 未來改成手動輸入時使用
// import { useChatStore } from '@store/useChatContext';
import {
	INQUIRE_TYPE,
	REGION_LIST,
	ORDER_LIST,
	CHAT_TYPE,
} from '@constants/enum';
import { getSendMessageByInquireType } from '@utils/inquireTypeUtils';

const allowRegion: { [key in INQUIRE_TYPE]: Array<REGION_LIST> } = {
	[INQUIRE_TYPE.BO]: [
		REGION_LIST.EMEA,
		REGION_LIST.NA,
		REGION_LIST.BR,
		REGION_LIST.MX,
		REGION_LIST.SSSPF,
		REGION_LIST.R2,
		REGION_LIST.CN,
		REGION_LIST.DS,
		REGION_LIST.IN,
	],
	[INQUIRE_TYPE.ETD]: [
		REGION_LIST.EMEA,
		REGION_LIST.NA,
		REGION_LIST.BR,
		REGION_LIST.MX,
		REGION_LIST.SSSPF,
		REGION_LIST.R2,
		REGION_LIST.CN,
		REGION_LIST.DS,
		REGION_LIST.IN,
	],
	[INQUIRE_TYPE.Shipment]: [REGION_LIST.CN],
	// E&O的region BR, EMEA, IN_DS, MX, ROAP, SSSPF,US_CA
	[INQUIRE_TYPE['E&O accountability']]: [
		REGION_LIST.BR,
		REGION_LIST.EMEA,
		REGION_LIST.IN,
		REGION_LIST.MX,
		REGION_LIST.ROAP,
		REGION_LIST.SSSPF,
		REGION_LIST.NA,
	],
};

type PropsType = {
	handleSearch(data: TSendData, chatType: CHAT_TYPE): void;
};

const Sidebar: React.FC<PropsType> = React.memo(({ handleSearch }) => {
	const { t } = useTranslation();
	const [form] = Form.useForm<TTemplateData>();
	const inquireType = Form.useWatch('inquireType', form) as INQUIRE_TYPE;
	// 未來改成手動輸入時使用
	// const { setSyncMessage } = useChatStore();

	const onFinish = (data: TTemplateData) => {
		const newMessage = getSendMessageByInquireType(data);
		// 未來改成手動輸入時使用
		// setSyncMessage(newMessage);
		handleSearch(
			{
				inquireType: data.inquireType,
				region:
					data.inquireType !== INQUIRE_TYPE.Shipment
						? data.region
						: undefined,
				pn: data.pn,
				mo: data.order === ORDER_LIST.MO ? data.no : undefined,
				do: data.order === ORDER_LIST.DO ? data.no : undefined,
				so: data.order === ORDER_LIST.SO ? data.no : undefined,
				message: newMessage,
			},
			CHAT_TYPE.GuidedInput
		);
	};

	const handleValuesChange = (data: TTemplateData) => {
		if (Object.keys(data).includes('inquireType')) {
			form.resetFields(['order']);
			if (data.inquireType === INQUIRE_TYPE.Shipment) {
				form.setFieldValue('region', REGION_LIST.CN);
			} else {
				form.resetFields(['no', 'region']);
			}
		}
	};

	return (
		<ConfigProvider
			theme={{
				components: {
					Form: {
						itemMarginBottom: 0,
					},
				},
			}}
		>
			<Styled.SidebarContainer style={{ width: 260 }}>
				<Styled.SidebarBlock>
					<div style={{ height: 'calc(100% - 108px)' }}>
						<div style={{ height: '100%' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-start',
									alignContent: 'center',
									marginBottom: '16px',
								}}
							>
								<ThunderboltOutlined
									style={{ color: Colors.figma_white_4 }}
								/>
								<div
									style={{
										display: 'inline-block',
										fontSize: '15px',
										marginLeft: '6px',
										color: Colors.figma_white_4,
									}}
								>
									{t('Plugin 問答')}
								</div>
							</div>
							<Styled.SmallTitle>
								{t('Question Type')}
							</Styled.SmallTitle>
							<Styled.SideBarSpan
								style={{
									display: inquireType ? 'flex' : 'none',
								}}
							>
								<Form
									form={form}
									onFinish={onFinish}
									layout="vertical"
									onValuesChange={handleValuesChange}
									requiredMark
								>
									<Form.Item
										name="inquireType"
										noStyle
										rules={[
											{
												required: true,
											},
										]}
										label="Question"
									>
										<Select
											placeholder="Please select question"
											style={{
												width: '100%',
												marginBottom: '16px',
											}}
										>
											{Object.keys(INQUIRE_TYPE).map(
												(key) => (
													<Select.Option
														value={
															INQUIRE_TYPE[
																key as keyof typeof INQUIRE_TYPE
															]
														}
														key={
															INQUIRE_TYPE[
																key as keyof typeof INQUIRE_TYPE
															]
														}
													>
														{key}
													</Select.Option>
												)
											)}
										</Select>
									</Form.Item>
									<Form.Item
										name="region"
										rules={[
											{
												required: true,
											},
										]}
										label="Region"
										tooltip={false}
									>
										<Select
											placeholder="Please select region"
											style={{
												width: '100%',
												marginBottom: '16px',
											}}
											disabled={
												inquireType ===
												INQUIRE_TYPE.Shipment
											}
										>
											{Object.values(
												allowRegion[inquireType] || {}
											).map((region) => (
												<Select.Option
													key={region}
													value={region}
												>
													{region}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									{inquireType === INQUIRE_TYPE.Shipment && (
										<>
											<Form.Item
												name="order"
												rules={[
													{
														required: true,
													},
												]}
												label="Order"
											>
												<Select
													placeholder="Please select order"
													style={{
														width: '100%',
														marginBottom: '16px',
													}}
												>
													{Object.keys(
														ORDER_LIST
													).map((order) => (
														<Select.Option
															key={order}
															value={order}
														>
															{order}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
											<Form.Item
												name="no"
												rules={[
													{
														required: true,
													},
												]}
												label="No"
											>
												<Input
													style={{
														minWidth: '0',
														flex: 1,
														marginBottom: '16px',
													}}
													placeholder="Please input No"
												/>
											</Form.Item>
										</>
									)}
									<Form.Item
										name="pn"
										rules={[
											{
												required:
													inquireType !==
													INQUIRE_TYPE.Shipment,
											},
										]}
										label="PN"
										required={
											inquireType !==
											INQUIRE_TYPE.Shipment
										}
									>
										<Input
											style={{
												minWidth: '0',
												flex: 1,
												marginBottom: '16px',
											}}
											placeholder="Please input PN"
										/>
									</Form.Item>
								</Form>
								<Styled.SubmitButton onClick={form.submit}>
									Submit
								</Styled.SubmitButton>
							</Styled.SideBarSpan>
							{inquireType && (
								<Styled.SmallTitle>
									{t('Select Another Type')}
								</Styled.SmallTitle>
							)}
							<Space size={[8, 8]} wrap>
								{Object.keys(INQUIRE_TYPE).map((key) => (
									<Styled.TypeButton
										key={
											INQUIRE_TYPE[
												key as keyof typeof INQUIRE_TYPE
											]
										}
										onClick={() => {
											const nextType =
												INQUIRE_TYPE[
													key as keyof typeof INQUIRE_TYPE
												];
											form.setFieldValue(
												'inquireType',
												nextType
											);
											if (
												nextType ===
												INQUIRE_TYPE.Shipment
											) {
												form.setFieldValue(
													'region',
													REGION_LIST.CN
												);
											} else {
												form.resetFields([
													'no',
													'region',
												]);
											}
										}}
									>
										{key}
									</Styled.TypeButton>
								))}
							</Space>
						</div>
					</div>
				</Styled.SidebarBlock>
			</Styled.SidebarContainer>
		</ConfigProvider>
	);
});

export default Sidebar;
