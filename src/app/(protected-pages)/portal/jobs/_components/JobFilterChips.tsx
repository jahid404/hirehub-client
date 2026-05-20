import { PiXBold } from 'react-icons/pi'
import { SALARY_OPTIONS } from './types'
import type { Filters } from './types'

interface Props {
    filters: Filters
    onRemove: (key: keyof Filters) => void
}

export default function JobFilterChips({ filters, onRemove }: Props) {
    const hasActive =
        filters.searchText ||
        filters.location ||
        filters.salaryRange ||
        filters.experienceLevel ||
        filters.employmentType ||
        filters.remoteInfo

    if (!hasActive) return null

    return (
        <div className="flex flex-wrap gap-2">
            {filters.searchText && (
                <Chip
                    label={`Search: "${filters.searchText}"`}
                    onRemove={() => onRemove('searchText')}
                />
            )}
            {filters.location && (
                <Chip
                    label={`Location: ${filters.location}`}
                    onRemove={() => onRemove('location')}
                />
            )}
            {filters.salaryRange && (
                <Chip
                    label={`Salary: ${
                        SALARY_OPTIONS.find(
                            (o) => o.value === filters.salaryRange,
                        )?.label ?? filters.salaryRange
                    }`}
                    onRemove={() => onRemove('salaryRange')}
                />
            )}
            {filters.experienceLevel && (
                <Chip
                    label={`Experience: ${filters.experienceLevel}`}
                    onRemove={() => onRemove('experienceLevel')}
                />
            )}
            {filters.employmentType && (
                <Chip
                    label={`Type: ${filters.employmentType}`}
                    onRemove={() => onRemove('employmentType')}
                />
            )}
            {filters.remoteInfo && (
                <Chip
                    label={`Setting: ${filters.remoteInfo}`}
                    onRemove={() => onRemove('remoteInfo')}
                />
            )}
        </div>
    )
}

// ─── Internal Chip ────────────────────────────────────────────────────────────
function Chip({
    label,
    onRemove,
}: {
    label: string
    onRemove: () => void
}) {
    return (
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {label}
            <button
                onClick={onRemove}
                className="ml-0.5 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 p-0.5 transition-colors"
                aria-label={`Remove filter: ${label}`}
            >
                <PiXBold className="text-[10px]" />
            </button>
        </span>
    )
}
