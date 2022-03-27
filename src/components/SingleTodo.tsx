import React,{useEffect, useRef, useState} from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { Task } from "../modal";
import {Draggable} from "react-beautiful-dnd"

interface Props {
    task:Task;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    tasks:Task[];
    index:number;
    markAsComplete:(id:string) => void;
}

const SingleTodo = ({task, setTasks, tasks,index, markAsComplete}:Props) => {
    const [edit,setEdit] = useState<boolean>(false);
    const [editedTaskStr,setEditedTaskStr] = useState<string>(task.task);
    const editRef = useRef<HTMLInputElement>(null);
    const editTask = (id:string) => {
        setTasks((prev:Task[]) => {
            prev.filter(task => task.id !== id)
            return prev.map(task => {
                return task.id === id?{
                    ...task,
                    task:editedTaskStr
                }:task
            });
        });
        setEdit(false);
    }
    const deleteTask = (id:string) => {
        setTasks((prev:Task[]) => {
            return prev.filter(task => task.id !== id);
        })
    }
   
    useEffect(() => {
        if(edit){
            editRef.current?.focus();
        }
    },[edit])
  return (
    <Draggable draggableId={task.id} index={index}>
        {
            (provided) => (
                <div className="todos__single" key={task.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                {
                    edit?
                    <input type="text" value={editedTaskStr} onChange={(e) => setEditedTaskStr(e.target.value)} onBlur={() => editTask(task.id)} ref={editRef} className="todos__single--text" />
                    :
                    <span className="todos__single--text" style={task.completed?{textDecoration:"line-through"}:{}} >{task.task}</span>
                }
              <div>
                <span className="icon" onClick={() => setEdit(!edit)}>
                  <AiFillEdit />
                </span>
                <span className="icon" onClick={() => deleteTask(task.id)} >
                  <AiFillDelete />
                </span>
        
                <span className="icon" onClick={() => markAsComplete(task.id)}>
                  <AiOutlineCheck />
                </span>
              </div>
            </div>
            )
        }
   
    </Draggable>
  );
};

export default SingleTodo;
