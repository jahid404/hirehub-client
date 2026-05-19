'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

// Configure NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

function ProgressBarHandler() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Complete progress when pathname or search parameters change
    useEffect(() => {
        NProgress.done()
    }, [pathname, searchParams])

    useEffect(() => {
        const handleAnchorClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const anchor = target.closest('a')

            if (!anchor) return

            const href = anchor.getAttribute('href')
            if (!href) return

            // Ignore external links, anchor targets, special click actions, and hashes
            const isExternal = href.startsWith('http') || href.startsWith('//')
            const isSpecialClick = event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0
            const isAnchor = href.startsWith('#') || href.startsWith('javascript:')
            const isTargetBlank = anchor.target === '_blank'

            if (isExternal || isSpecialClick || isAnchor || isTargetBlank) {
                return
            }

            NProgress.start()
        }

        document.addEventListener('click', handleAnchorClick, { capture: true })
        
        return () => {
            document.removeEventListener('click', handleAnchorClick, { capture: true })
            NProgress.done()
        }
    }, [])

    return null
}

export default function ProgressBar() {
    return (
        <Suspense fallback={null}>
            <ProgressBarHandler />
        </Suspense>
    )
}
