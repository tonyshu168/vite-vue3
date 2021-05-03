import axios from 'axios';
import { Message, Msgbox } from 'element3';
import store from 'store';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = 'my token';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;

    if ( res.code !== 2000 ) {
      Message.error({
        message: res.message || 'Error',
        duration: 5 * 1000
      });

      // 5008: 非法令牌; 5012: 其他客户端已登入; 5014: 令牌过期;
      if (res.code === 5008 || res.code === 5012 || res.code === 5014 ) {
        Msgbox.confirm('您已登出，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'));
    }
    else {
      return res;
    }
  },
  error => {
    console.log('Err ' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });

    return Promise.reject(error);
  }
)

export default service;
