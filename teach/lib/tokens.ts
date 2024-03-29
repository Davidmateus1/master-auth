import {v4 as uuidv4} from 'uuid'
import { db } from './db'
import { getVerificationTokenByEmail } from '@/data/verification-Token'

export const generateVerificationToken = async (email: string) => {
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken){
        await db.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        })

    }

    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600*100)

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return verificationToken;
}