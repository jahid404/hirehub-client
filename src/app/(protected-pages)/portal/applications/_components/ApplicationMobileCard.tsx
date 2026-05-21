'use client'

import { Button } from '@/components/ui'
import {
    PiEyeDuotone,
    PiMapPinDuotone,
    PiBriefcaseDuotone,
    PiCalendarDuotone,
    PiHashDuotone,
} from 'react-icons/pi'
import dayjs from 'dayjs'
import type { ApplicationResponse } from '@/features/applications'

const STATUS_STYLES: Record<string, string> = {
    pending:
        'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800',
    under_review:
        'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800',
    shortlisted:
        'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 ring-1 ring-violet-200 dark:ring-violet-800',
    interview_scheduled:
        'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-200 dark:ring-indigo-800',
    offered:
        'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800',
    rejected:
        'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-800',
}

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    under_review: 'Under Review',
    shortlisted: 'Shortlisted',
    interview_scheduled: 'Interview Scheduled',
    offered: 'Offered 🎉',
    rejected: 'Not Selected',
}

const STATUS_BAR: Record<string, string> = {
    pending: 'bg-amber-400',
    under_review: 'bg-blue-500',
    shortlisted: 'bg-violet-500',
    interview_scheduled: 'bg-indigo-500',
    offered: 'bg-emerald-500',
    rejected: 'bg-rose-500',
}

interface Props {
    application: ApplicationResponse
    isRecruiterOrAdmin: boolean
    onViewStatus: (application: ApplicationResponse) => void
}

export default function ApplicationMobileCard({
    application,
    isRecruiterOrAdmin,
    onViewStatus,
}: Props) {
    const statusStyle =
        STATUS_STYLES[application.status] ??
        'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700'
    const statusLabel = STATUS_LABELS[application.status] ?? application.status
    const barColor = STATUS_BAR[application.status] ?? 'bg-gray-400'

    return (
        <div className="relative rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            {/* Colored status strip at top */}
            <div className={`h-1 w-full ${barColor} transition-all duration-300`} />

            <div className="p-4 flex flex-col gap-3">
                {/* Top row: title + status badge */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug truncate">
                            {application.job?.title ?? '—'}
                        </h3>
                        {isRecruiterOrAdmin && (
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 truncate">
                                {application.fullName}
                            </p>
                        )}
                    </div>
                    <span
                        className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle}`}
                    >
                        {statusLabel}
                    </span>
                </div>

                {/* Meta info grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <PiMapPinDuotone className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{application.job?.location ?? '—'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <PiBriefcaseDuotone className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{application.job?.employmentType ?? '—'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <PiCalendarDuotone className="text-gray-400 flex-shrink-0" />
                        <span>{dayjs(application.createdAt).format('MMM DD, YYYY')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <PiHashDuotone className="text-gray-400 flex-shrink-0" />
                        <span className="font-mono text-[10px] truncate">{application.applicationId}</span>
                    </div>
                </div>

                {/* View status button */}
                <Button
                    variant="plain"
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl h-9 mt-1 transition-all duration-200"
                    onClick={() => onViewStatus(application)}
                >
                    <PiEyeDuotone className="text-indigo-500 text-sm" />
                    {isRecruiterOrAdmin ? 'Review Application' : 'View Status & Details'}
                </Button>
            </div>
        </div>
    )
}
