'use client'

import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { PiGlobe } from 'react-icons/pi'
import classNames from '@/utils/classNames'

const _VisitWebsiteButton = ({ className }: { className?: string }) => {
    const navigateToWebsite = () => {
        window.open('/', '_blank')
    }

    return (
        <button
            className={classNames(
                'text-2xl cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 outline-none focus:outline-none flex items-center justify-center',
                className,
            )}
            onClick={navigateToWebsite}
            aria-label="Visit Website"
        >
            <PiGlobe className="text-slate-700 dark:text-slate-300 transition-transform duration-300 hover:-rotate-12" />
        </button>
    )
}

const VisitWebsiteButton = withHeaderItem(_VisitWebsiteButton)

export default VisitWebsiteButton
