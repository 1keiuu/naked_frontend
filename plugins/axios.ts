import axios, { AxiosRequestConfig } from 'axios'

export default function({ store, $axios }:any) {
  $axios.onRequest((config: AxiosRequestConfig) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.$auth.$state.user.token}`
    return config
  })
}