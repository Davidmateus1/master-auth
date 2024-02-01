import Image from 'next/image'
import { Poppins } from 'next/font/google'

import { Button } from "@/components/ui/button"
import { LoginButton } from '@/components/auth/login-button'
import { cn } from '@/lib/utils'


const font = Poppins({
  subsets:['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className='h-[100vh]  bg-blue-400 flex flex-col space-y-6 justify-center items-center'>
      <h1 className={cn('text-6xl font-semibold text-white', font.className)}>
        👀Auth 
      </h1>
      <p className='text-white text-lg'>
        A simple authentication with using Next-Auth
      </p>
      
      <LoginButton >
        <Button variant='secondary' size='lg' className='font-semibold'>
          Sign in
        </Button>
      </LoginButton>
    </main>
    )
}
