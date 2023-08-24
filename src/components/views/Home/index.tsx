"use client"
import { Box, Flex } from "@chakra-ui/react"
import Top from "./Top"
import Body from "./Body"
import { useEffect, useState } from "react"
import { isBrowser } from "@/components/utils/functions"

const HomeComp = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        if (isBrowser()) {
            let tokenFromStorage = localStorage.getItem("tokenForBasitTodo") as string;
            if (tokenFromStorage) {
                setLoggedIn(true);
            }
        }
    }, [])


    return (
        <Box className="w-[20rem] md:w-[26rem] lg:w-[28rem] 2xl:w-[34rem]">
            <Box className="space-y-6">
                <Top />
                {isLoggedIn ? (
                    <Body />
                ) : (
                    <Flex color={"#9FA4C4"} justifyContent={"center"} alignItems={"center"} p={"3rem"} w={"full"} bg={"white"} textAlign={"center"}>
                        Please Login or Genrate Token first
                    </Flex>
                )
                }
            </Box>
        </Box>
    )
}

export default HomeComp