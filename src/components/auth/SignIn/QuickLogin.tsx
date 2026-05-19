import React from 'react'
import Button from '@/components/ui/Button'
import { ADMIN, RECRUITER, CANDIDATE } from '@/constants/roles.constant'

type RoleType = typeof ADMIN | typeof RECRUITER | typeof CANDIDATE

type QuickLoginProps = {
    onQuickLogin: (role: RoleType) => void
}

const roles = [
    { key: ADMIN, label: 'Admin' },
    { key: RECRUITER, label: 'Recruiter' },
    { key: CANDIDATE, label: 'Candidate' },
] as const

export default function QuickLogin({ onQuickLogin }: QuickLoginProps) {
    return (
        <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
                <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                <p className="font-semibold text-xs heading-text uppercase tracking-wider opacity-75">
                    Quick Login
                </p>
                <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
            </div>
            <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                    <Button
                        key={role.key}
                        type="button"
                        size="sm"
                        variant="default"
                        onClick={() => onQuickLogin(role.key)}
                        className="font-semibold text-xs py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        {role.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}
