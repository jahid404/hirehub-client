import React from 'react'
import PostLoginLayout from '@/components/layouts/PostLoginLayout'
import ProgressBar from '@/components/template/ProgressBar'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
    return (
        <PostLoginLayout>
            <ProgressBar />
            {children}
        </PostLoginLayout>
    )
}

export default Layout
