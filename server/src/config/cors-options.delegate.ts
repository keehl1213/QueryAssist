import { Request } from 'express';
import { whitelist } from '../constant/DEFINE';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const CorsOptionsDelegate = (req: Request, callback: Function) => {
	const corsOptions = {
		allowedHeaders: 'Content-Type, Accept',
		methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
		credentials: true,
	};
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions['origin'] = true;
	} else {
		corsOptions['origin'] = false;
	}
	callback(null, corsOptions);
};
