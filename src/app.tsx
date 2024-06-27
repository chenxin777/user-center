import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type {BasicLayoutProps, Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {getCurrentUser} from '@/services/ant-design-pro/api';
import {RequestConfig} from '@@/plugin-request/request';

const loginPath = '/user/login';
/**
 * 无需用户登陆态的页面
 */
const NO_NEED_LOGIN_WHITE_LIST: string[] = ['/user/register', loginPath];

/**
 * 全局配置域名
 */
export const request: RequestConfig = {
	timeout: 1000000,
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
	loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
	settings?: Partial<LayoutSettings>;
	currentUser?: API.CurrentUser;
	loading?: boolean;
	fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
	const fetchUserInfo = async () => {
		try {
			return await getCurrentUser();
		} catch (error) {
			history.push(loginPath);
		}
		return undefined;
	};
	// 如果不是登录页面，执行
	if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname)) {
		return {
			// @ts-ignore
			fetchUserInfo,
			settings: defaultSettings,
		};
	}
	const currentUser = await fetchUserInfo();
	return {
		// @ts-ignore
		fetchUserInfo,
		// @ts-ignore
		currentUser,
		settings: defaultSettings,
	};
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
	return {
		rightContentRender: () => <RightContent/>,
		disableContentMargin: false,
		waterMarkProps: {
			content: initialState?.currentUser?.username,
		},
		footerRender: () => <Footer/>,
		onPageChange: () => {
			const {location} = history;
			if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) {
				return;
			}
			// 如果没有登录，重定向到 login
			if (!initialState?.currentUser && location.pathname !== loginPath) {
				history.push(loginPath);
			}
		},
		menuHeaderRender: undefined,
		// 自定义 403 页面
		// unAccessible: <div>unAccessible</div>,
		// 增加一个 loading 的状态
		childrenRender: (children: Element, props: BasicLayoutProps) => {
			// if (initialState?.loading) return <PageLoading />;
			return (
				<>
					{children}
					{!props.location?.pathname?.includes('/login') && (
						<SettingDrawer
							disableUrlParams
							enableDarkTheme
							settings={initialState?.settings}
							onSettingChange={(settings) => {
								setInitialState((preInitialState) => ({
									...preInitialState,
									settings,
								}));
							}}
						/>
					)}
				</>
			);
		},
		...initialState?.settings,
	};
};
