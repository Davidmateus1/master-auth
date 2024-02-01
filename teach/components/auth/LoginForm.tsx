'use client'

import { CardWrapper } from "@/components/auth/CardWrapper"

import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/schemas"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { FormError } from "@/components/Form-error"
import { FormSuccess } from "@/components/Form-success"
import { login } from "@/actions/Login"
import { useState, useTransition } from "react"





export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with other provider' : ""


    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        setError('')
        setSuccess('')
        
        startTransition(()=>{
            login(values)
            .then((data)=>{
                
                setError(data?.error)
                // setSuccess(data?.success)

            })
        })
    }

    return(
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial= {true}
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled= {isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                       <FormField 
                            control={form.control}
                            name="password"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled= {isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}



