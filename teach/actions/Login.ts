"use server"

import z from 'zod'

import { LoginSchema } from "@/schemas"
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'


export const login = async (values: z.infer<typeof LoginSchema>) =>{

    const validatedFields = LoginSchema.safeParse(values)
    

    if(!validatedFields.success) return {error: 'Invalid fields'}

    const {email, password} = validatedFields.data;
    const existingUser = await getUserByEmail(email)


    if(!existingUser || !existingUser.email || !existingUser.password){
        return {
            error: 'There is some problem with your email'
        }
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email)
        return { success: 'Confirmation email sent'}
    }
    
    try {   

        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

    }catch (error) {

       if(error instanceof AuthError){
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials'}                                
                default:
                    return { error: 'Something went wrong'}                                
            }
       }

       throw error; // é um must, temos que colocar se não dá erro !
       
    }
}