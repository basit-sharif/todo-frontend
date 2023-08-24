export interface todosType {
    PARTITION_KEY: string,
    TODO_NAME: string,
    CHECKED: boolean,
};

export interface allStateBodyType {
    isLoading:boolean,
    isError:boolean,
    updateLoading:boolean,
}