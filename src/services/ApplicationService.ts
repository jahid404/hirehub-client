import ApiService from './ApiService'

export async function apiApplyJob<T = any>(data: FormData) {
    return ApiService.triggerApiSync<T, FormData>({
        url: '/applications/apply',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export async function apiGetApplications<T = any>() {
    return ApiService.triggerApiSync<T>({
        url: '/applications',
        method: 'get',
    })
}

export async function apiUpdateApplicationStatus<T = any>(
    applicationId: string,
    status: string,
) {
    return ApiService.triggerApiSync<T>({
        url: `/applications/${applicationId}/status`,
        method: 'patch',
        data: { status },
    })
}
