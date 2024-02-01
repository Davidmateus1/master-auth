'use server'

import { RegisterSchema } from '@/schemas'
import z from 'zod'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'

export const register = async (values: z.infer<typeof RegisterSchema>) =>{

    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: 'Invalid register fields'}
    }

  
    const {email, password, name} = validatedFields.data;
    

    const hashPassword = await bcryptjs.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return {
            error: 'This email already has an account'
        }
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashPassword
        }
    })

    const verificationToken = await generateVerificationToken(email);
    // TODO: send a verification token email !


    return {success: 'Confirmation email sent'}

}
