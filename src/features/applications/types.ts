export interface ApplicationApplicant {
    fullName: string
    email: string
    phone: string
    linkedInUrl?: string
    coverLetter?: string
}

export interface ApplicationResume {
    fileName: string
    fileSize: number
    mimeType: string
    file: File
}

export interface ApplicationPayload {
    jobId: string
    jobTitle: string
    applicant: ApplicationApplicant
    resume: ApplicationResume
    submittedAt: string
}

export interface ApplicationFormValues {
    fullName: string
    email: string
    phone: string
    coverLetter: string
    linkedInUrl: string
    resume: File | null
}

// ── Response Types (from GET /applications API) ──────────────────────────

export interface ApplicationResumeResponse {
    id: string
    fileName: string
    fileSize: number
    mimeType: string
    url: string
    applicationId: string
    createdAt: string
    updatedAt: string
}

export interface ApplicationJobResponse {
    id: string
    title: string
    description: string
    salaryRange: string
    location: string
    employmentType: string
    experienceLevel: string
    requiredSkills: string[]
    vacancyCount: number
    applicationDeadline: string
    remoteInfo: string
    recruiterId: string
    createdAt: string
    updatedAt: string
}

export type ApplicationStatus =
    | 'pending'
    | 'under_review'
    | 'shortlisted'
    | 'interview_scheduled'
    | 'offered'
    | 'rejected'

export interface ApplicationResponse {
    id: string
    applicationId: string
    jobId: string
    job: ApplicationJobResponse
    candidateId: string | null
    fullName: string
    email: string
    phone: string
    coverLetter: string | null
    linkedInUrl: string | null
    status: ApplicationStatus | string
    createdAt: string
    updatedAt: string
    resume: ApplicationResumeResponse | null
}
