import { getTodosData, updateTodoData } from "@/components/utils/apicalling";
import { allStateBodyType, todosType } from "@/components/utils/types";
import { Box, Checkbox, Flex, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';
import { isBrowser } from "@/components/utils/functions";

const Body = () => {
  const [todosData, settodosData] = useState<Array<todosType>>([]);
  const [allState, setAllState] = useState<allStateBodyType>({
    isLoading: false,
    isError: false,
    updateLoading: false,
  });
  const { isLoading, isError, updateLoading } = allState;

  async function fetchAPi() {
    setAllState({
      ...allState,
      isLoading: true,
    });
    let dataOfTodos: any = await getTodosData();
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
  }
  useEffect(() => {
    fetchAPi();
  }, []);

  async function handleUpdate(e: any) {
    setAllState({
      ...allState,
      updateLoading: true,
    });
    if (isBrowser()) {
      let userIdTokenPartitionKye = localStorage.getItem("tokenForBasitTodo") as string;
      if (userIdTokenPartitionKye) {
        userIdTokenPartitionKye = JSON.parse(userIdTokenPartitionKye)
        await updateTodoData(e.target.checked, userIdTokenPartitionKye);
      };
    }
    setAllState({
      ...allState,
      updateLoading: false,
    });
  }


  return (
    <Flex justifyContent={"center"} alignItems={"center"} p={"3rem"} w={"full"} bg={"white"}>
      {isLoading ? (
        <Box>
          <Spinner size={"lg"} />
        </Box>
      ) : isError ? (
        <Box>Error Occured On Server</Box>
      ) : (
        <Box w={"full"}>
          {todosData.map((item: todosType, index: number) => (
            <Flex py={"10px"} alignItems={"center"} justifyContent={"space-between"} key={index} w={"full"}>
              <label className="flex gap-4">
                {updateLoading ? <Spinner size={"xs"} /> : <input onChange={handleUpdate} checked={item.CHECKED} type="checkbox" />}
                <Text fontWeight={"semibold"} fontSize={"18px"} color={"#A0A7C4"}>
                  {item.TODO_NAME}
                </Text>
              </label>
              <Trash2 size={20} color="#9FA4C4" />
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  )
}

export default Body