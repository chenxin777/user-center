import {extend} from 'umi-request';
import {history} from "umi";
import {stringify} from "querystring";
import {message} from "antd";

const request = extend({
    credentials: 'include', // 默认请求是否带上cookie
    prefix: process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : undefined,

});

request.interceptors.request.use((url, options): any => {
    console.log(`do request url = ${url}`)
    return {
        options: {
            ...options,
            headers: {},
        }
    };
});

request.interceptors.response.use(async (response, options): Promise<any> => {
    const res = await response.clone().json();
    if (res.code === 0) {
        return res.data;
    }
    // 未登录
    if (res.code === 40100) {
        message.error('请先登录');
        history.replace(
            {
                pathname: 'user/login',
                search: stringify({
                    redirect: location.pathname,
                })
            }
        )
    } else {
        message.error(res.description);
    }
    return res.data;
});

export default request;
