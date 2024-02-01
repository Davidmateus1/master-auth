'use client'


import { useRouter } from "next/navigation"

interface LoginButtonProps {
    children: React.ReactNode,
    modal?: 'modal'|'redirect',
    asChild?: boolean
}

export const LoginButton = ({
    children,
    modal= 'redirect',
    asChild
}: LoginButtonProps) => {

    const router = useRouter();
    
    const onClick = () => {
        router.push('auth/login')
    }
    
    if(modal == 'modal'){
        return (
            <div>
                Yes modal 
            </div>
        )
    }
  return (
   <span onClick={onClick} className="cursor-pointer">
    {children}
   </span>
  )
}

