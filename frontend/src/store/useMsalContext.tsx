import { createContext, useContext } from 'react';
import * as msal from '@azure/msal-browser';
import { MsalConfig } from '@/utils/msalAuth';

export const MsalContext = createContext<{
	instance?: msal.PublicClientApplication;
}>({});

export const instance = new msal.PublicClientApplication(MsalConfig);

export const useMsalStore = () => useContext(MsalContext);

export const MsalContextProvider = ({ children }: { children: any }) => {
	return (
		<MsalContext.Provider
			value={{
				instance,
			}}
		>
			{children}
		</MsalContext.Provider>
	);
};

export default MsalContextProvider;
