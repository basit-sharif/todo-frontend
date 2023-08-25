import { deleteTodoData, updateTodoData } from "@/components/utils/apicalling"
import { isBrowser } from "@/components/utils/functions"
import { todosType } from "@/components/utils/types"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { Trash2 } from "lucide-react"
import { FC, useState } from "react"

const SingleTodo: FC<{ item: todosType, index: number, fetchAPi: any }> = ({ item, index, fetchAPi }) => {
    const [updateLoading, setUpdateLoading] = useState(false);

    async function handleUpdate(e: any, todoId: string) {
        setUpdateLoading(true);
        if (isBrowser()) {
            let userIdTokenPartitionKye = localStorage.getItem("tokenForBasitTodo") as string;
            if (userIdTokenPartitionKye) {
                userIdTokenPartitionKye = JSON.parse(userIdTokenPartitionKye)
                await updateTodoData(e.target.checked, userIdTokenPartitionKye, todoId);
            };
        };
        await fetchAPi();
        setUpdateLoading(false);
    };
    async function handleDelete(todoId:string){
        setUpdateLoading(true);
        if (isBrowser()) {
            let userIdTokenPartitionKye = localStorage.getItem("tokenForBasitTodo") as string;
            if (userIdTokenPartitionKye) {
                userIdTokenPartitionKye = JSON.parse(userIdTokenPartitionKye)
                await deleteTodoData(userIdTokenPartitionKye, todoId);
            };
        };
        await fetchAPi();
        setUpdateLoading(false);
    }

    return (
        <Flex py={"10px"} alignItems={"center"} justifyContent={"space-between"} key={index} w={"full"}>
            <label className="flex gap-4">
                {updateLoading ? <Spinner mt={"7px"} size={"xs"} /> : <input onChange={(e) => handleUpdate(e, item.todoId)} checked={item.checked} type="checkbox" />}
                <Text fontWeight={"semibold"} fontSize={"18px"} color={"#A0A7C4"}>
                    {item.checked ? <del>{item.todoName}</del> : item.todoName}
                </Text>
            </label>
            <Trash2 className="cursor-pointer" onClick={(e)=>handleDelete(item.todoId)} size={20} color="#9FA4C4" />
        </Flex>
    )
}

export default SingleTodo