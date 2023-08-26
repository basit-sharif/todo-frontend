import { getTodosData, makeNewTodo } from "@/components/utils/apicalling";
import { isBrowser } from "@/components/utils/functions";
import { allStateBodyType, todosType } from "@/components/utils/types";
import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";

const Body = () => {
  const [todosData, settodosData] = useState<Array<todosType>>([]);
  const [newTodoVal, setNewTodoVal] = useState("");
  const [allState, setAllState] = useState<allStateBodyType>({
    isLoading: false,
    isError: false,
    newTodoLoading: false,
  });
  const { isLoading, isError, newTodoLoading } = allState;
  const { isOpen, onOpen, onClose } = useDisclosure()

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  async function fetchAPi() {
    if (isBrowser()) {
      setAllState({
        ...allState,
        isLoading: true,
      });
      let dataOfTodos: any = await getTodosData(JSON.parse(localStorage.getItem("tokenForBasitTodo") as string));
      if (dataOfTodos == "Error") {
        setAllState({
          ...allState,
          isError: true,
        });
      };
      settodosData(dataOfTodos);
      setAllState({
        ...allState,
        isLoading: false,
      });
    };
  };

  async function handleAddTodo() {
    setAllState({
      ...allState,
      newTodoLoading: true,
    });
    await makeNewTodo(newTodoVal, JSON.parse(localStorage.getItem("tokenForBasitTodo") as string));
    await fetchAPi();
    setAllState({
      ...allState,
      newTodoLoading: false,
    });
    onClose();
  }

  useEffect(() => {
    fetchAPi();
  }, []);

  return (
    <>
      <Flex pos={"relative"} justifyContent={"center"} alignItems={"center"} p={"3rem"} w={"full"} bg={"white"} shadow={"lg"}>
        {isLoading ? (
          <Box>
            <Spinner size={"lg"} />
          </Box>
        ) : isError ? (
          <Box>Error Occured On Server</Box>
        ) : (
          <Box w={"full"} px={"10px"} overflow={"auto"} maxH={"14rem"} className="scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-200">
            {todosData.map((item: todosType, index: number) => (
              <SingleTodo key={index} item={item} index={index} fetchAPi={fetchAPi} />
            ))}
            <button
              onClick={() => {
                onOpen()
              }}
              className="absolute left-[28%] md:left-[30%] lg:left-[34%] -bottom-6 py-3 px-8 rounded-[21px] bg-[#B07FEC] text-white">+ New task</button>
          </Box>
        )}
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>We are here to manage your tasks! Put your task name here...</Text>
            <Input value={newTodoVal} onChange={(e) => setNewTodoVal(e.target.value)} mt={"6px"} type="text" />
          </ModalBody>
          <ModalFooter gap={"10px"}>
            <Button
              isLoading={newTodoLoading}
              // spinner={<BeatLoader size={8} color='white' />}
              loadingText='Adding'
              onClick={handleAddTodo}
              colorScheme='blue'
              variant='outline'
            >
              Add
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Body