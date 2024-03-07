import { TodoType } from '../vite-env'
import { Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';


type PropsType={
  todo:TodoType,
  completeHandler:(id:TodoType["id"])=>void,
  deleteHandler:(id:TodoType["id"])=>void,
  editHandler:(id:TodoType["id"],title:TodoType["title"],isCompleted:TodoType["isCompleted"])=>void,
}

const TodoItem = ({todo,deleteHandler,completeHandler,editHandler}:PropsType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<TodoType["title"]>(todo.title);

  return (
    <div>
    <Paper  sx={{padding:"1rem", margin:".5rem 0"}}  variant='outlined' >
      <Stack direction={"row"} alignItems={"center"} >
        {
          isEdit ?<TextField value={textVal} 
          onChange={(e)=>setTextVal(e.target.value)}  
          onKeyDown={(e)=>{
            if(e.key==="Enter" && textVal!=="") 
         {
          editHandler(todo.id,textVal,todo.isCompleted);
          setIsEdit(false);
         }
          }} />
          :<Typography marginRight={"auto"}>{todo.title}</Typography>
     
        }
     {/* <TextField/> */}
     <Checkbox checked={todo.isCompleted} 
              onChange={()=>completeHandler(todo.id)}
              onKeyDown={(e)=>{
                if(e.key==="Enter") setIsEdit(false);
               }}
              />
     <Button onClick={()=>setIsEdit((prev)=>!prev)} ><Edit/></Button>
     <Button onClick={()=>deleteHandler(todo.id)} ><Delete color="secondary"/></Button>
     </Stack>
    </Paper>
    </div>
  )
}

export default TodoItem