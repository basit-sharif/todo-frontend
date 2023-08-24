"use client"
import { Box } from "@chakra-ui/react"
import Top from "./Top"
import Body from "./Body"

const HomeComp = () => {
    return (
        <Box className="w-[20rem] md:w-[26rem] lg:w-[28rem] 2xl:w-[34rem]">
            <Box className="space-y-6">
                <Top />
                <Body />
            </Box>
        </Box>
    )
}

export default HomeComp