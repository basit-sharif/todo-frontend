import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmitHandler(data: any) {
        console.log(data)
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
                        <Input {...register('valueBasit', { required: true })} mt={"10px"} type='text' />
                        {
                            errors.valueBasit &&
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
                            Login
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Login