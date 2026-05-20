import { Input, Select } from '@/components/ui'
import {
    PiMapPinBold,
    PiCurrencyDollarBold,
    PiArrowsDownUpBold,
    PiBriefcaseBold,
    PiGlobeBold,
} from 'react-icons/pi'
import {
    SALARY_OPTIONS,
    EXPERIENCE_OPTIONS,
    EMPLOYMENT_OPTIONS,
    REMOTE_OPTIONS,
} from './types'
import type { Filters } from './types'

interface Props {
    filters: Filters
    onFilterChange: (key: keyof Filters, value: string) => void
}

export default function JobFilterPanel({ filters, onFilterChange }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
            {/* Location */}
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <PiMapPinBold />
                    Location
                </label>
                <Input
                    id="filter-location"
                    value={filters.location}
                    onChange={(e) =>
                        onFilterChange('location', e.target.value)
                    }
                    placeholder="e.g. New York, Remote..."
                    className="h-9 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                />
            </div>

            {/* Salary Range */}
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <PiCurrencyDollarBold />
                    Salary Range
                </label>
                <Select
                    id="filter-salary"
                    value={SALARY_OPTIONS.find(
                        (o) => o.value === filters.salaryRange,
                    )}
                    options={SALARY_OPTIONS}
                    onChange={(opt: any) =>
                        onFilterChange('salaryRange', opt?.value ?? '')
                    }
                    placeholder="Any Salary"
                    className="text-sm"
                />
            </div>

            {/* Experience Level */}
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <PiArrowsDownUpBold />
                    Experience Level
                </label>
                <Select
                    id="filter-experience"
                    value={EXPERIENCE_OPTIONS.find(
                        (o) => o.value === filters.experienceLevel,
                    )}
                    options={EXPERIENCE_OPTIONS}
                    onChange={(opt: any) =>
                        onFilterChange('experienceLevel', opt?.value ?? '')
                    }
                    placeholder="All Levels"
                    className="text-sm"
                />
            </div>

            {/* Employment Type */}
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <PiBriefcaseBold />
                    Employment Type
                </label>
                <Select
                    id="filter-employment"
                    value={EMPLOYMENT_OPTIONS.find(
                        (o) => o.value === filters.employmentType,
                    )}
                    options={EMPLOYMENT_OPTIONS}
                    onChange={(opt: any) =>
                        onFilterChange('employmentType', opt?.value ?? '')
                    }
                    placeholder="All Types"
                    className="text-sm"
                />
            </div>

            {/* Work Setting */}
            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <PiGlobeBold />
                    Work Setting
                </label>
                <Select
                    id="filter-remote"
                    value={REMOTE_OPTIONS.find(
                        (o) => o.value === filters.remoteInfo,
                    )}
                    options={REMOTE_OPTIONS}
                    onChange={(opt: any) =>
                        onFilterChange('remoteInfo', opt?.value ?? '')
                    }
                    placeholder="All Settings"
                    className="text-sm"
                />
            </div>
        </div>
    )
}
