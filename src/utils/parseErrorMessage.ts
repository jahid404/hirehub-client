/**
 * Utility function to parse error messages, particularly stringified JSON arrays
 * representing Zod validation errors, into a clean, human-readable format.
 */
export function parseErrorMessage(error: unknown): string {
    if (!error) {
        return 'Something went wrong'
    }

    // Extract standard error fields
    let errorMessage = 'Something went wrong'
    if (typeof error === 'string') {
        errorMessage = error
    } else if (error && typeof error === 'object') {
        // Handle Axios errors or standard Error objects
        const axiosError = error as any
        errorMessage =
            axiosError?.response?.data?.message ||
            axiosError?.message ||
            'Something went wrong'
    }

    // Try parsing stringified JSON arrays (e.g. Zod validation errors)
    try {
        if (
            typeof errorMessage === 'string' &&
            (errorMessage.trim().startsWith('[') ||
                errorMessage.trim().startsWith('{'))
        ) {
            const parsed = JSON.parse(errorMessage)
            if (Array.isArray(parsed)) {
                return parsed.map((err: any) => err.message).join(', ')
            } else if (parsed && typeof parsed === 'object' && parsed.message) {
                return parsed.message
            }
        }
    } catch (e) {
        // Fallback to extracted message if parsing fails
    }

    return errorMessage
}

export default parseErrorMessage
