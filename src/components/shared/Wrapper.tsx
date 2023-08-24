"use client"
import { FC, ReactNode } from "react"
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'


const ChakraWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ChakraProvider>
            <CacheProvider>
                {children}
            </CacheProvider>
        </ChakraProvider>
    )
}

export default ChakraWrapper