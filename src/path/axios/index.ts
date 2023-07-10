import { baseURL } from './config';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// export const tvAxios = axios.create({
//   baseURL, // 设置请求的基础 URL
//   timeout: 10000, // 设置请求超时时间
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


const axiosInstance: AxiosInstance = axios.create({ baseURL });

// 请求拦截器
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  // 在请求发送之前做一些处理
  // config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  return config;
}, (error) => {
  // 对请求错误做一些处理
  return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  // 对响应数据做一些处理
  return response.data;
}, (error) => {
  // 对响应错误做一些处理
  return Promise.reject(error);
});

export const tvAxios = axiosInstance;

