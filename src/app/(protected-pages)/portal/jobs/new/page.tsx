'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import JobForm from '../_components/JobForm'
import { apiCreateJob } from '@/services/JobService'
import { Notification, toast } from '@/components/ui'
import parseErrorMessage from '@/utils/parseErrorMessage'

export default function PostNewJobPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleFormSubmit = async (values: any) => {
        setIsSubmitting(true)
        setErrorMessage('')
        try {
            const response = await apiCreateJob(values)
            if (response && response.success) {
                toast.push(
                    <Notification
                        title="Job Posted Successfully!"
                        type="success"
                    >
                        Your career opportunity has been published live.
                    </Notification>,
                )
                router.push('/portal/jobs')
            } else {
                setErrorMessage(
                    'Failed to create the job post. Please review inputs.',
                )
            }
        } catch (err: any) {
            console.error('Error creating job post:', err)
            setErrorMessage(
                parseErrorMessage(err) || 'Failed to submit the job post.',
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto">
            {/* Header banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="absolute right-0 top-0 w-85 h-85 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        Create Post
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-2 text-white">
                        Post a New Job Opportunity
                    </h1>
                    <p className="text-slate-300 max-w-xl text-xs md:text-sm leading-relaxed">
                        Fill out target specifications, employment details, and
                        required skills to discover top matches for your open
                        roles.
                    </p>
                </div>
            </div>

            {/* Reusable Form */}
            <JobForm
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                submitButtonText="Publish Post"
            />
        </div>
    )
}
