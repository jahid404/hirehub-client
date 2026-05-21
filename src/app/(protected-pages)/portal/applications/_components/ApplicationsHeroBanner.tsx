'use client'

import { PiFileTextDuotone } from 'react-icons/pi'

interface Props {
    userName?: string
    isRecruiterOrAdmin: boolean
}

export default function ApplicationsHeroBanner({
    userName,
    isRecruiterOrAdmin,
}: Props) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-6 md:p-8 text-white shadow-xl">
            {/* Decorative blobs */}
            <div className="absolute right-0 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-8 bottom-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <PiFileTextDuotone className="text-white text-2xl md:text-3xl" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-300 mb-1">
                        {isRecruiterOrAdmin
                            ? 'Recruitment Hub'
                            : 'My Applications'}
                    </p>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                        {isRecruiterOrAdmin
                            ? 'Applications Dashboard'
                            : `Track Your Journey${userName ? `, ${userName.split(' ')[0]}` : ''}`}
                    </h1>
                    <p className="text-slate-300 mt-1.5 text-xs md:text-sm leading-relaxed max-w-xl">
                        {isRecruiterOrAdmin
                            ? 'Review incoming candidate applications, update hiring statuses, and manage your recruitment pipeline — all from one place.'
                            : 'Monitor the real-time status of every job application you\'ve submitted. Click "View Status" on any application to explore full details and track your progress.'}
                    </p>
                </div>
            </div>
        </div>
    )
}
