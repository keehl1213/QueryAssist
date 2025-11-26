import React from 'react';
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import routes from './routerConfig';

const router = createBrowserRouter(createRoutesFromElements(routes()));

const Router: React.FC = () => {
	const component = <RouterProvider router={router} />;
	return component;
};

export default Router;
