"use client"
import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Login from './Login';

const Top = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const watchedValue = useWatch({ control, name: 'valueBasit' });
    const [isLoading, setLoading] = useState(false);
    const [condition, setCondition] = useState("empty");

    const isBrowser = () => typeof window !== undefined;

    let errorMessage: undefined | string = undefined;
    if (watchedValue !== "basitsharif") {
        errorMessage = 'Value must be same';
    } else {
        errorMessage = undefined;
    };

    let tokenFromStorage: any;
    if (isBrowser() && window.localStorage) {
        tokenFromStorage = window.localStorage.getItem("tokenForBasitTodo") as string
    }

    let onSubmitHandler = (data: any) => {
        if (!errorMessage) {
            let userToken = uuidv4();
            if (isBrowser()) {
                localStorage.setItem("tokenForBasitTodo", JSON.stringify(userToken));
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    onClose();
                    window.location.reload();
                }, 1000);
            }
        };
    };

    useEffect(() => {
        if (tokenFromStorage) {
            setCondition("filled")
        }
    }, []);

    return (
        <>
            <Flex justifyContent={"space-between"} color={"white"} alignItems={"center"} px={"10px"} py={"10px"} bg={"#B17DE9"} >
                <Menu color="white" size={33} />
                {condition === "empty" ? (
                    <Box className='space-x-3'>
                        <button onClick={onOpen} className='font-semibold text-lg hover:text-blue-600 hover:scale-95 duration-200'>
                            Genrate Token
                        </button>
                        <Login />
                    </Box>
                ) : (
                    <Box bg={"gray.300"} rounded={"full"} px={"6px"} py={"2px"}>
                        {tokenFromStorage}
                    </Box>
                )}
            </Flex>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Genrate you Auth Token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        It will genrate a Access token for you to login next time or to keep record of you todos.
                        <br />
                        <br />
                        Are you sure you want to Genrate? Type <q>basitsharif</q> to genrate acces token
                        <br />
                        <Input {...register('valueBasit', { required: true })} mt={"10px"} type='text' />
                        {
                            !!errorMessage &&
                            <motion.p
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                style={{ color: "#ff0000bd", fontSize: "0.88rem" }}>
                                {errorMessage}
                            </motion.p>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit(onSubmitHandler)} mr={3}>
                            {isLoading ? <Spinner size={"sm"} /> : "Create"}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Top