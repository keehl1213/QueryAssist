import { useState, createContext, useContext, useMemo } from 'react';

export const ChatContext = createContext<ChatProps>({
	syncMessage: '',
	setSyncMessage: () => null,
});

export const useChatStore = () => useContext(ChatContext);

export const ChatProvider = ({ children }: { children: any }) => {
	const [syncMessage, setSyncMessage] = useState('');

	const value = useMemo(
		() => ({
			syncMessage,
			setSyncMessage,
		}),
		[syncMessage, setSyncMessage]
	);

	return (
		<ChatContext.Provider value={value}>{children}</ChatContext.Provider>
	);
};

export default ChatProvider;
