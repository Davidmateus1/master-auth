'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/auth/Header"
import { Social } from "@/components/auth/Social"
import { BackButton } from "@/components/auth/BackButton"


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean

}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) =>{

    return(
        <Card>
            <CardHeader>
                <Header  label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && 
            <CardFooter>
                <Social />
            </CardFooter>}
            <CardFooter>
                <BackButton 
                label={backButtonLabel}
                href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}