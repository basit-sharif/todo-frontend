export const getTodosData = async () => {
    let res = await fetch("https://6c88qmw690.execute-api.us-east-1.amazonaws.com/gettodos", {
        cache: "no-store",
    });
    if (!res.ok) {
        return "Error"
    }
    return res.json();
}