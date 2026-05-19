'use client'

import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import ApiService from '@/services/ApiService'
import { Notification, toast } from '@/components/ui'
import { useRouter } from 'next/navigation'
import parseErrorMessage from '@/utils/parseErrorMessage'

export type OnSignInPayload = {
    values: SignInFormSchema
    setSubmitting: (isSubmitting: boolean) => void
    setMessage: (message: string) => void
}

export type OnSignIn = (payload: OnSignInPayload) => void

interface SignInFormProps extends CommonProps {
    passwordHint?: string | ReactNode
    setMessage: (message: string) => void
    onSignIn?: OnSignIn
    onFormReady?: (
        setValue: (name: 'email' | 'password', value: string) => void
    ) => void
}

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema = z.object({
    email: z.string().min(1, { message: 'Please enter your email' }),
    password: z.string().min(1, { message: 'Please enter your password' }),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const router = useRouter()

    const { className, setMessage, onSignIn, passwordHint, onFormReady } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (onFormReady) {
            onFormReady((name, value) => {
                setValue(name, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            })
        }
    }, [onFormReady, setValue])

    const handleSignIn = async (values: SignInFormSchema) => {
        setSubmitting(true)
        setMessage('')

        try {
            if (onSignIn) {
                onSignIn({
                    values,
                    setSubmitting,
                    setMessage: (msg) => {
                        setMessage(msg)
                        setSubmitting(false)
                    },
                })
            }
        } catch (error: any) {
            setMessage(parseErrorMessage(error))
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(handleSignIn)}>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                    className={classNames(
                        passwordHint ? 'mb-0' : '',
                        errors.password?.message ? 'mb-8' : '',
                    )}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Password"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                {passwordHint}
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm
