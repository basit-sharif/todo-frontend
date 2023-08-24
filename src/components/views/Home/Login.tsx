import { getTodosData } from '@/components/utils/apicalling';
import { todosType } from '@/components/utils/types';
import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setLoading] = useState<boolean>(false);
    const notify = (message: string) => toast(message);

    const isBrowser = () => typeof window !== undefined;

    async function onSubmitHandler(data: any) {
        setLoading(true);
        let dataOfTodos: any = await getTodosData();
        let truethyArr: boolean[] = [];

        dataOfTodos.forEach((item: todosType) => {
            if (item.PARTITION_KEY === data.valueToken && isBrowser()) {
                truethyArr.push(true);
                localStorage.setItem("tokenForBasitTodo", JSON.stringify(data.valueToken));
            } else {
                truethyArr.push(false);
            }
        });
        setLoading(false);
        console.log(truethyArr)
        !truethyArr.includes(true) && notify("Invalid Token or Expired token");
        onClose();
    }

    return (
        <>
            <button onClick={onOpen} className='font-semibold text-lg hover:text-blue-600 hover:scale-95 duration-200'>
                / &nbsp; Login
            </button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Genrate you Auth Token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        This token will be used to fetch your todos data from database
                        <Input {...register('valueToken', { required: true })} mt={"10px"} type='text' />
                        {
                            errors.valueToken &&
                            <motion.p
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                style={{ color: "#ff0000bd", fontSize: "0.88rem" }}>
                                Token is required
                            </motion.p>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit(onSubmitHandler)} mr={3}>
                            {isLoading ? <Spinner size={"sm"} /> : "Login"}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default Login