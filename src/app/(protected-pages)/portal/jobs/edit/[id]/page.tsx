'use client'

import React, { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import JobForm from '../../_components/JobForm'
import { apiGetJob, apiUpdateJob } from '@/services/JobService'
import { Notification, toast, Spinner, Alert } from '@/components/ui'
import parseErrorMessage from '@/utils/parseErrorMessage'

interface EditJobPageProps {
    params: Promise<{ id: string }>
}

export default function EditJobPage({ params }: EditJobPageProps) {
    const { id } = use(params)
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState<any>(null)
    const [fetchError, setFetchError] = useState('')

    // Load existing job details
    useEffect(() => {
        const loadJob = async () => {
            setLoading(true)
            setFetchError('')
            try {
                const response = await apiGetJob<any>(id)
                if (response && response.data) {
                    setInitialData(response.data)
                } else {
                    setFetchError('Could not find the requested job post. It may have been removed.')
                }
            } catch (err: any) {
                console.error('Failed to fetch job for editing:', err)
                setFetchError(
                    parseErrorMessage(err) || 'An error occurred while loading this job post.',
                )
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            loadJob()
        }
    }, [id])

    const handleFormSubmit = async (values: any) => {
        setIsSubmitting(true)
        setErrorMessage('')
        try {
            const response = await apiUpdateJob<any>(id, values)
            if (response && response.success) {
                toast.push(
                    <Notification title="Job Updated!" type="success">
                        Your job posting has been successfully updated with the new specifications.
                    </Notification>,
                )
                router.push('/portal/jobs')
            } else {
                setErrorMessage('Failed to update the job post. Please review your inputs.')
            }
        } catch (err: any) {
            console.error('Error updating job post:', err)
            setErrorMessage(parseErrorMessage(err) || 'Failed to update the job post.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Spinner size="lg" className="text-indigo-600" />
                <span className="text-sm font-medium text-gray-500 animate-pulse">
                    Loading job details for editing...
                </span>
            </div>
        )
    }

    if (fetchError) {
        return (
            <div className="max-w-4xl mx-auto p-4 md:p-6">
                <Alert type="danger" showIcon title="Job Not Found">
                    {fetchError}
                </Alert>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto">
            {/* Header banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="absolute right-0 top-0 w-85 h-85 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        Edit Post
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-2 text-white">
                        Edit Job Opportunity
                    </h1>
                    <p className="text-slate-300 max-w-xl text-xs md:text-sm leading-relaxed">
                        Update role specifications, requirements, salary expectations, or deadline information for your published position.
                    </p>
                </div>
            </div>

            {/* Reusable form pre-filled with current job data */}
            <JobForm
                initialData={initialData}
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                submitButtonText="Save Changes"
            />
        </div>
    )
}
