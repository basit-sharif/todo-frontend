"use client"
import { Box } from "@chakra-ui/react"
import Top from "./Top"

const HomeComp = () => {
    return (
        <Box className="w-[20rem] md:w-[26rem] lg:w-[28rem] 2xl:w-[34rem]">
            <Box>
                <Top />
            </Box>
        </Box>
    )
}

export default HomeComp