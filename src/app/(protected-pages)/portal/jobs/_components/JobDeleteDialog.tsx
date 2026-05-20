import ConfirmDialog from '@/components/shared/ConfirmDialog'
import type { JobType } from './types'

interface Props {
    isOpen: boolean
    job: JobType | null
    isDeleting: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function JobDeleteDialog({
    isOpen,
    job,
    isDeleting,
    onClose,
    onConfirm,
}: Props) {
    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            type="danger"
            title="Delete Job Post?"
            onCancel={onClose}
            onConfirm={onConfirm}
            confirmButtonProps={{ loading: isDeleting }}
            confirmText="Confirm Delete"
        >
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Are you absolutely sure you want to permanently delete the job
                post{' '}
                <strong className="text-gray-900 dark:text-gray-200">
                    &quot;{job?.title}&quot;
                </strong>
                ? This action is irreversible, and all associated candidate
                applications may be impacted.
            </p>
        </ConfirmDialog>
    )
}
