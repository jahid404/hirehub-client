import { Card } from '@/components/ui'
import {
    PiBriefcaseBold,
    PiUsersBold,
    PiCalendarCheckBold,
} from 'react-icons/pi'
import type { KpiData } from './types'

interface Props {
    kpis: KpiData
}

export default function JobsKpiCards({ kpis }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Active Posts */}
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl flex items-center gap-4 p-4 md:p-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl">
                    <PiBriefcaseBold />
                </div>
                <div>
                    <h4 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                        {kpis.totalActive}
                    </h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                        Total Active Posts
                    </p>
                </div>
            </Card>

            {/* Total Vacancies */}
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl flex items-center gap-4 p-4 md:p-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl">
                    <PiUsersBold />
                </div>
                <div>
                    <h4 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                        {kpis.totalVacancies}
                    </h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                        Total Vacancies Open
                    </p>
                </div>
            </Card>

            {/* Nearest Deadline */}
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl flex items-center gap-4 p-4 md:p-5">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl">
                    <PiCalendarCheckBold />
                </div>
                <div>
                    <h4 className="text-base font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                        {kpis.nearestDeadline}
                    </h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                        Nearest Deadline
                    </p>
                </div>
            </Card>
        </div>
    )
}
