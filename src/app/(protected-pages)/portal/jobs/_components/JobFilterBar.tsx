import { Input, Button } from '@/components/ui'
import {
    PiMagnifyingGlassBold,
    PiSlidersHorizontalBold,
    PiXBold,
} from 'react-icons/pi'
import type { Filters } from './types'

interface Props {
    filters: Filters
    showFilters: boolean
    activeFilterCount: number
    totalJobs: number
    onFilterChange: (key: keyof Filters, value: string) => void
    onToggleFilters: () => void
    onClearFilters: () => void
}

export default function JobFilterBar({
    filters,
    showFilters,
    activeFilterCount,
    totalJobs,
    onFilterChange,
    onToggleFilters,
    onClearFilters,
}: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: title + result count */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Published Roles
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                    {totalJobs} job{totalJobs !== 1 ? 's' : ''} found
                    {activeFilterCount > 0
                        ? ` · ${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} active`
                        : ''}
                </p>
            </div>

            {/* Right: search + filter toggle + clear */}
            <div className="flex items-center gap-2 flex-wrap">
                {/* Search input */}
                <div className="relative w-full sm:w-64">
                    <Input
                        id="job-search-input"
                        value={filters.searchText}
                        onChange={(e) =>
                            onFilterChange('searchText', e.target.value)
                        }
                        placeholder="Search by title, location..."
                        className="h-10 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg text-sm pl-9"
                    />
                    <PiMagnifyingGlassBold className="absolute left-3 top-3 text-gray-400 text-base" />
                </div>

                {/* Filter toggle */}
                <Button
                    id="toggle-filters-btn"
                    size="sm"
                    className={`h-10 px-3.5 rounded-lg flex items-center gap-1.5 border transition-all font-semibold text-sm
                        ${
                            showFilters || activeFilterCount > 0
                                ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                                : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    onClick={onToggleFilters}
                >
                    <PiSlidersHorizontalBold className="text-base" />
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="ml-0.5 bg-white text-indigo-700 rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>

                {/* Clear all */}
                {activeFilterCount > 0 && (
                    <Button
                        id="clear-filters-btn"
                        size="sm"
                        className="h-10 px-3 rounded-lg flex items-center gap-1.5 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-semibold text-sm transition-all"
                        onClick={onClearFilters}
                    >
                        <PiXBold className="text-sm" />
                        Clear All
                    </Button>
                )}
            </div>
        </div>
    )
}
