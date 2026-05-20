import ApiService from './ApiService'

export async function apiGetJobs<T = any>(params?: Record<string, any>) {
    return ApiService.triggerApiSync<T>({
        url: '/jobs',
        method: 'get',
        params,
    })
}

export async function apiGetJob<T = any>(id: string) {
    return ApiService.triggerApiSync<T>({
        url: `/jobs/${id}`,
        method: 'get',
    })
}

export async function apiCreateJob<T = any>(data: any) {
    return ApiService.triggerApiSync<T>({
        url: '/jobs/create-job',
        method: 'post',
        data,
    })
}

export async function apiUpdateJob<T = any>(id: string, data: any) {
    return ApiService.triggerApiSync<T>({
        url: `/jobs/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteJob<T = any>(id: string) {
    return ApiService.triggerApiSync<T>({
        url: `/jobs/${id}`,
        method: 'delete',
    })
}
