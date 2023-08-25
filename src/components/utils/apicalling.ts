export const getTodosData = async (userId?: string) => {
    let url = userId ? `https://6c88qmw690.execute-api.us-east-1.amazonaws.com/gettodos?accessToken=basit-sharifbasitsharif35@gmail.com&userId=${userId}` : `https://6c88qmw690.execute-api.us-east-1.amazonaws.com/gettodos?accessToken=basit-sharifbasitsharif35@gmail.com`

    let res = await fetch(url, {
        cache: "no-store",
    });
    if (!res.ok) {
        return "Error"
    };
    return res.json();
};

export const updateTodoData = async (newValue: boolean, userId: string, todoId: string) => {
    let res = await fetch("https://6c88qmw690.execute-api.us-east-1.amazonaws.com/updatetodos?accessToken=basit-sharifbasitsharif35@gmail.com", {
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify({
            userId: userId,
            todoId: todoId,
            checked: newValue,
        })
    });
    if (!res.ok) {
        return "Error"
    }
    return res.json();
};


export const deleteTodoData = async (userId: string, todoId: string) => {
    let res = await fetch("https://6c88qmw690.execute-api.us-east-1.amazonaws.com/deletetodos", {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({
            todoId: todoId,
            userId: userId,
        })
    });
    if (!res.ok) {
        return "Error"
    }
    return res.json();
};

export const makeNewTodo = async (newTodoName: string, userId: string) => {
    let res = await fetch("https://6c88qmw690.execute-api.us-east-1.amazonaws.com/posttodos", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
            todoName: newTodoName,
            userId: userId,
            accessToken: "basit-sharifbasitsharif35@gmail.com"
        }),
    });
    if (!res.ok) {
        return "Error"
    }
    return res.json();
}