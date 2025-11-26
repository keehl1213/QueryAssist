import { lazy, Suspense } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import PATH, { APP_PREFIX, FULLPAGE_PREFIX } from './pathConstants';
import Authentication from './Authentication';

export const WaitingComponent = (Component: any) =>
	function (props: any) {
		return (
			<Suspense fallback={<div>Module loading....</div>}>
				<Component {...props} />
			</Suspense>
		);
	};

const EmptyPage = () => (
	<>Opps... Something went wrong. Please check your url path again.</>
);

/*
  Layout
*/
const App = WaitingComponent(lazy(() => import('@pages/App/App/App')));
const FullPage = WaitingComponent(
	lazy(() => import('@pages/App/FullPage/FullPage'))
);

const routes = () => (
	<Route element={<Authentication />}>
		<Route path={FULLPAGE_PREFIX} element={<FullPage />}>
			{FullpageRoutes()}
		</Route>
		<Route path={APP_PREFIX} element={<App />}>
			{AppRoutes()}
		</Route>
	</Route>
);

/*
  APP Routes
*/
const ChatRoom = WaitingComponent(
	lazy(() => import('@pages/ChatRoom/ChatRoomPage'))
);
const appRoutes: RouteProps[] = [
	{ path: PATH.CHATROOM, element: <ChatRoom /> },
	{ path: '/app/b', element: <ChatRoom /> },
	{ path: '/app/c', element: <ChatRoom /> },
];

export const AppRoutes = () =>
	appRoutes.map((config) => (
		<Route key={`route_${config.path}`} {...config} />
	));

/*
  FULLPAGE Routes
*/
const Login = WaitingComponent(lazy(() => import('@pages/Login/Login')));
// const OAuth = WaitingComponent(
// 	lazy(() => import('@pages/Login/OAuthPage/OAuthPage'))
// );

const fullpageRoutes: RouteProps[] = [
	{ path: PATH.LOGIN, element: <Login /> },
	{ path: PATH.OAUTH_CALLBACK, element: <Login /> },
	{ element: <EmptyPage /> },
];

export const FullpageRoutes = () => (
	<>
		{fullpageRoutes.map((config) => (
			<Route key={`route_${config.path}`} {...config} />
		))}
	</>
);

export default routes;
