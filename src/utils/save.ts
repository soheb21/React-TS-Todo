import { TodoType } from "../vite-env";

export const saveLocal=(todo:TodoType[]):void=>{
    localStorage.setItem("myTodo",JSON.stringify(todo));
}
export const getItemLocal=():TodoType[]=>{
    const todos= localStorage.getItem("myTodo")
    return todos ?JSON.parse(todos):[];
}