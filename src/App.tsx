import React, { FC, useState } from "react";
import "./App.css";
import InputTab from "./components/InputTab";
import { Task } from "./modal";
import TaskList from "./components/TaskList";
import { DragDropContext, DropResult  } from "react-beautiful-dnd";

const App: FC = () => {
  const [taskToAdd, setTaskToAdd] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(tasks);
  const handleAddClick = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (taskToAdd) {
      setTasks((prev: Task[]) => [
        ...prev,
        {
          id: `${Date.now()}`,
          task: taskToAdd,
          completed: false,
        },
      ]);
      setTaskToAdd("");
    }
  };
  const markAsComplete = (id:string) => {
    setTasks((prev:Task[]) => {
       return prev.map(task => {
            return task.id === id?{
                ...task,
                completed:!task.completed
            }:task
        });
    })
}

const onDragEnd = (result:DropResult) => {
  console.log(result)
  const {source,destination,draggableId} = result;
  if(!destination || source.droppableId === destination.droppableId) return;
  if(destination.droppableId === "todosRemove"){
    markAsComplete(draggableId);
  }else{
    markAsComplete(draggableId);
  }
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="heading">Taskify</span>
      <InputTab
        setTaskToAdd={setTaskToAdd}
        taskToAdd={taskToAdd}
        handleAddClick={handleAddClick}
      />
      <TaskList tasks={tasks} setTasks={setTasks} markAsComplete={markAsComplete}  />
    </div>
    </DragDropContext>
  );
};

export default App;
