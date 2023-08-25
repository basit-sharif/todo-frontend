export interface todosType {
    todoId: string,
    todoName: string,
    checked: boolean,
    userId: string,
};

export interface allStateBodyType {
    isLoading: boolean,
    isError: boolean,
    newTodoLoading:boolean,
}