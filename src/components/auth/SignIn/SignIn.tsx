'use client'

import { useRef } from 'react'
import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './SignInForm'
import OauthSignIn from './OauthSignIn'
import QuickLogin from './QuickLogin'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useTheme from '@/utils/hooks/useTheme'
import { ADMIN, RECRUITER, CANDIDATE } from '@/constants/roles.constant'
import type { OnSignIn } from './SignInForm'
import type { OnOauthSignIn } from './OauthSignIn'
import Link from 'next/link'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    onSignIn?: OnSignIn
    onOauthSignIn?: OnOauthSignIn
}

const SignIn = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    onSignIn,
    onOauthSignIn,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useTheme((state) => state.mode)

    const setValueRef = useRef<
        ((name: 'email' | 'password', value: string) => void) | null
    >(null)

    const handleQuickLogin = (
        role: typeof ADMIN | typeof RECRUITER | typeof CANDIDATE
    ) => {
        if (setValueRef.current) {
            setValueRef.current('email', `${role}@hirehub.com`)
            setValueRef.current('password', '123456789')
        }
    }

    return (
        <>
            <div className="mb-8">
                <Link href="/">
                    <Logo
                        type="pocket"
                        mode={mode}
                        logoWidth={60}
                        logoHeight={60}
                    />
                </Link>
            </div>
            <div className="mb-10">
                <h2 className="mb-2">Welcome back!</h2>
                <p className="font-semibold heading-text">
                    Please enter your credentials to sign in!
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-7 mt-2">
                        <ActionLink
                            href={forgetPasswordUrl}
                            className="font-semibold heading-text mt-2 underline"
                            themeColor={false}
                        >
                            Forgot password
                        </ActionLink>
                    </div>
                }
                onSignIn={onSignIn}
                onFormReady={(setValue) => {
                    setValueRef.current = setValue
                }}
            />
            {/* <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                    <p className="font-semibold heading-text">
                        or continue with
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                </div>
                {<OauthSignIn
                    setMessage={setMessage}
                    onOauthSignIn={onOauthSignIn}
                />}
            </div> */}

            {process.env.NODE_ENV === 'development' && (
                <QuickLogin onQuickLogin={handleQuickLogin} />
            )}

            <div>
                <div className="mt-6 text-center">
                    <span>{`Don't have an account yet?`} </span>
                    <ActionLink
                        href={signUpUrl}
                        className="heading-text font-bold"
                        themeColor={false}
                    >
                        Sign up
                    </ActionLink>
                </div>
            </div>
        </>
    )
}

export default SignIn
