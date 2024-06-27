import {Settings as LayoutSettings} from '@ant-design/pro-components';

const Settings: LayoutSettings & {
	pwa?: boolean;
	logo?: string;
} = {
	navTheme: 'light',
	// 拂晓蓝
	primaryColor: '#1890ff',
	layout: 'mix',
	contentWidth: 'Fluid',
	fixedHeader: false,
	fixSiderbar: true,
	colorWeak: false,
	title: 'Play',
	pwa: false,
	logo: 'http://8.140.27.137:9000/mypic/imgs/logo.png ',
	iconfontUrl: '',
};

export default Settings;
