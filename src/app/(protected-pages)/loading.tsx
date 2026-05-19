'use client'

import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import NProgress from 'nprogress'

const LoadingSpinner = () => {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])

    return (
        <div className="flex flex-auto flex-col h-full">
            <Loading loading={true} />
        </div>
    )
}

export default LoadingSpinner
