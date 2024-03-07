import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import TodoItem from "./components/TodoItem"
import { TodoType } from "./vite-env"
import { useEffect, useState } from "react";
import { getItemLocal, saveLocal } from "./utils/save";

function App() {
 
  const [todo, setTodo] = useState<TodoType[]>(getItemLocal());
  const [newtitle, setNewtitle] = useState<TodoType["title"]>("");
  const completeHandler=(id:TodoType["id"]):void=>{
   const newTodos:TodoType[]= todo.map(i=>{
    if(i.id===id) i.isCompleted=!i.isCompleted;
      return i;
   })
   setTodo(newTodos)
  };
  const deleteHandler=(id:TodoType["id"]):void=>{
   const deleteTodo:TodoType[]= todo.filter(i=>i.id!==id);
   setTodo(deleteTodo)
  };

  const editHandler=(id:TodoType["id"],title:TodoType["title"],isCompleted:TodoType["isCompleted"]):void=>{
    const newEditTodos:TodoType[]= todo.map(i=>{
      if(i.id===id){
        i.title=title;
        i.isCompleted=isCompleted;
      } 
        return i;
     })
     setTodo(newEditTodos)
     console.log(todo)

  }


  const handleSubmit=():void=>{
    const newTodo:TodoType={
      title:newtitle,
      isCompleted:false,
      id:String(Math.round(Math.random()*1000))
    }
    setTodo([...todo,newTodo])
    setNewtitle("");
   
  }
  useEffect(()=>{
    saveLocal(todo);
  },[todo])

  return (
   <>
   <Container maxWidth="sm" sx={{height:"100vh"}}>
    <AppBar position="static">
      <Toolbar>
        <Typography>Todo</Typography>
      </Toolbar>
    </AppBar>
    <Stack height={"80%"} direction={"column"}  >
    {
      todo?.map((i)=> <TodoItem key={i.id} 
      todo={i} 
      completeHandler={completeHandler}
      deleteHandler={deleteHandler}
      editHandler={editHandler}
      />)
    }
    </Stack>
    <TextField 
     value={newtitle}
     onChange={(e)=>setNewtitle(e.target.value)} 
     fullWidth label={"New Task"}
     onKeyDown={(e)=>{
      if(e.key==="Enter" &&  newtitle!=="" ) handleSubmit();
     }}
     />
    <Button disabled={newtitle===""} sx={{margin:"1rem 0"}} onClick={handleSubmit}  fullWidth variant="contained">+Add</Button>
   
   </Container>
   </>
  )
}

export default App
