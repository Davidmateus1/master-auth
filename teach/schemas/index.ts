import  * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'This error come from zod schema'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'This error come from zod schema'
    }),
    password: z.string().min(6, {
        message: 'Password is required'
    }),
    name: z.string().min(1,{
        message: 'Name is required'
    })

});