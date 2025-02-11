import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { AxiosLoading } from './loading'
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '~/composables/authorization'
import { ContentTypeEnum, RequestEnum } from '~#/http-enum'
import router from '~/router'
import { RESPONSE_CODE } from '~@/types/static'

export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

export type END_TYPE = 'main' | 'carla' | 'task'

export interface RequestConfigExtra {
  token?: boolean
  customDev?: boolean
  loading?: boolean
  type?: END_TYPE
}
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL ?? '/',
  timeout: 60000,
  headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
})
const axiosLoading = new AxiosLoading()
async function requestHandler(config: InternalAxiosRequestConfig & RequestConfigExtra): Promise<InternalAxiosRequestConfig> {
  // 处理请求前的url

  if (
    import.meta.env.DEV
    && import.meta.env.VITE_APP_BASE_API_DEV
    && import.meta.env.VITE_APP_BASE_URL_DEV
    && import.meta.env.VITE_APP_BASE_API2_DEV
    && import.meta.env.VITE_APP_BASE_URL2_DEV
    && config.customDev
  ) {
    //  替换url的请求前缀baseUrl
    if (config.type === 'main')
      config.baseURL = import.meta.env.VITE_APP_BASE_URL_DEV
    else if (config.type === 'carla')
      config.baseURL = import.meta.env.VITE_APP_BASE_URL2_DEV
  }
  const token = useAuthorization()

  if (token.value && config.token !== false)
    config.headers.set(STORAGE_AUTHORIZE_KEY, token.value)

  // 增加多语言的配置
  const { locale } = useI18nLocale()
  config.headers.set('Accept-Language', locale.value ?? 'zh-CN')
  config.headers.set('Access-Control-Allow-Origin', '*')
  if (config.loading)
    axiosLoading.addLoading()
  return config
}

function responseHandler(response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
  if (response.data.code === RESPONSE_CODE.OK && response.data.msg !== '')
    message.success(response.data.msg)
  else if (response.data.code !== RESPONSE_CODE.OK && response.data.msg !== '')
    message.error(response.data.msg)
  return response.data
}

function errorHandler(error: AxiosError): Promise<any> {
  const token = useAuthorization()
  const notification = useNotification()

  if (error.response) {
    const { data, status, statusText } = error.response as AxiosResponse<ResponseBody>
    if (status === 401) {
      notification?.error({
        message: '401',
        description: data?.msg || statusText,
        duration: 3,
      })
      /**
       * 这里处理清空用户信息和token的逻辑，后续扩展
       */
      token.value = null
      router
        .push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        })
        .then(() => {})
    }
    else if (status === 403) {
      notification?.error({
        message: '403',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
    else if (status === 500) {
      notification?.error({
        message: '500',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
    else {
      notification?.error({
        message: '服务错误',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
  }
  return Promise.reject(error)
}
interface AxiosOptions<T> {
  url: string
  params?: T
  data?: T
}
instance.interceptors.request.use(requestHandler)

instance.interceptors.response.use(responseHandler, errorHandler)

export default instance
function instancePromise<R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<ResponseBody<R>> {
  const { loading } = options
  switch (options.type) {
    case 'task':
      return new Promise((resolve, reject) => {
        const instance_: AxiosInstance = axios.create({
          baseURL: `http://localhost:9001/api_ana`,
          timeout: 60000,
          headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
        })
        instance_.interceptors.response.use(responseHandler, errorHandler)
        instance_.request(options).then((res) => {
          resolve(res as any)
        }).catch((e: Error | AxiosError) => {
          reject(e)
        })
          .finally(() => {
            if (loading)
              axiosLoading.closeLoading()
          })
      })
    case 'carla':
      return new Promise((resolve, reject) => {
        const instance_: AxiosInstance = axios.create({
          baseURL: `http://localhost:1555/api_sim`,
          timeout: 60000,
          headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
        })
        instance_.interceptors.response.use(responseHandler, errorHandler)
        instance_.request(options).then((res) => {
          resolve(res as any)
        }).catch((e: Error | AxiosError) => {
          reject(e)
        })
          .finally(() => {
            if (loading)
              axiosLoading.closeLoading()
          })
      })
    case 'main':
    default:
      return new Promise((resolve, reject) => {
        instance.request(options).then((res) => {
          resolve(res as any)
        }).catch((e: Error | AxiosError) => {
          reject(e)
        })
          .finally(() => {
            if (loading)
              axiosLoading.closeLoading()
          })
      })
  }
}
export function useGet< R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  }
  return instancePromise< R, T >(options)
}

export function usePost< R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  }
  return instancePromise< R, T >(options)
}

export function usePut< R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function useDelete< R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function useGetDownload(url: string, args: any = {}) {
  return () => {
    axios({
      url,
      method: 'GET',
      params: args, // 将参数作为查询参数传递
      responseType: 'blob', // 接收文件流
    })
      .then((response) => {
      // 获取文件名（从 Content-Disposition 头中解析，或者设置默认文件名）
        const contentDisposition = response.headers['content-disposition']
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
          : '下载文件.zip' // 默认文件名

        // 创建一个 URL 对象并触发下载
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName) // 设置下载文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((error) => {
        console.error('下载失败：', error)
      })
  }
}
