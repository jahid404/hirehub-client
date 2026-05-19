import type { InternalAxiosRequestConfig } from 'axios'

const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
}

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    if (typeof window !== 'undefined') {
        const token = getCookie('accessToken')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
}

export default AxiosRequestIntrceptorConfigCallback
