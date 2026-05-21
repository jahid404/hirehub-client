'use client'

import type { ApplicationResponse } from '@/features/applications'

interface KpiItem {
    title: string
    value: number
    sub: string
    color: string
    bg: string
    border: string
}

function buildKpis(apps: ApplicationResponse[], isRecruiterOrAdmin: boolean): KpiItem[] {
    if (isRecruiterOrAdmin) {
        const total = apps.length
        const pending = apps.filter((a) => a.status === 'pending' || a.status === 'under_review').length
        const interviewing = apps.filter(
            (a) => a.status === 'shortlisted' || a.status === 'interview_scheduled',
        ).length
        const decided = apps.filter((a) => a.status === 'offered' || a.status === 'rejected').length
        return [
            {
                title: 'Total Applications',
                value: total,
                sub: 'Submitted to your jobs',
                color: 'text-indigo-600 dark:text-indigo-400',
                bg: 'bg-indigo-50 dark:bg-indigo-950/30',
                border: 'border-indigo-100 dark:border-indigo-900/50',
            },
            {
                title: 'Pending Review',
                value: pending,
                sub: 'Waiting for your action',
                color: 'text-amber-600 dark:text-amber-400',
                bg: 'bg-amber-50 dark:bg-amber-950/30',
                border: 'border-amber-100 dark:border-amber-900/50',
            },
            {
                title: 'Interviewing',
                value: interviewing,
                sub: 'Shortlisted or scheduled',
                color: 'text-violet-600 dark:text-violet-400',
                bg: 'bg-violet-50 dark:bg-violet-950/30',
                border: 'border-violet-100 dark:border-violet-900/50',
            },
            {
                title: 'Decided',
                value: decided,
                sub: 'Offered or not selected',
                color: 'text-emerald-600 dark:text-emerald-400',
                bg: 'bg-emerald-50 dark:bg-emerald-950/30',
                border: 'border-emerald-100 dark:border-emerald-900/50',
            },
        ]
    }

    const total = apps.length
    const underReview = apps.filter(
        (a) => a.status === 'under_review' || a.status === 'shortlisted' || a.status === 'interview_scheduled',
    ).length
    const offered = apps.filter((a) => a.status === 'offered').length

    return [
        {
            title: 'Applications Sent',
            value: total,
            sub: 'Total jobs applied to',
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-50 dark:bg-indigo-950/30',
            border: 'border-indigo-100 dark:border-indigo-900/50',
        },
        {
            title: 'Under Review',
            value: underReview,
            sub: 'Currently being evaluated',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-950/30',
            border: 'border-blue-100 dark:border-blue-900/50',
        },
        {
            title: 'Offers Received',
            value: offered,
            sub: 'Active job offers',
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
            border: 'border-emerald-100 dark:border-emerald-900/50',
        },
    ]
}

interface Props {
    applications: ApplicationResponse[]
    isRecruiterOrAdmin: boolean
}

export default function ApplicationsKpiCards({ applications, isRecruiterOrAdmin }: Props) {
    const kpis = buildKpis(applications, isRecruiterOrAdmin)

    return (
        <div className={`grid gap-4 ${isRecruiterOrAdmin ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {kpis.map((kpi) => (
                <div
                    key={kpi.title}
                    className={`rounded-2xl border ${kpi.border} ${kpi.bg} px-5 py-4 flex flex-col gap-1 hover:shadow-md transition-shadow duration-300`}
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {kpi.title}
                    </span>
                    <span className={`text-3xl font-extrabold tracking-tight ${kpi.color}`}>
                        {kpi.value}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">{kpi.sub}</span>
                </div>
            ))}
        </div>
    )
}
