import { useState, useMemo, useCallback } from 'react';

export type UseModalReturnType<T> = {
	visible: boolean;
	modalData?: T;
	openModal: (data?: any) => void;
	closeModal: () => void;
};

export const useModal = <T>(initData: T): UseModalReturnType<T> => {
	const initValue = useMemo(
		() => ({
			visible: false,
			modalData: initData,
		}),
		[]
	);

	const [{ visible, modalData }, setState] = useState(initValue);

	const openModal = useCallback((data: any) => {
		setState({
			visible: true,
			modalData: data,
		});
	}, []);

	const closeModal = useCallback(() => {
		setState({
			visible: false,
			modalData: initData,
		});
	}, []);

	return {
		visible,
		modalData,
		openModal,
		closeModal,
	};
};

export default useModal;
