import React, { useState } from "react";
import { Task } from "../modal";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  markAsComplete:(id:string) => void;
}

const TaskList = ({ tasks, setTasks, markAsComplete }: Props) => {
  return (
    <>
      <div className="container">
        <Droppable droppableId="todos">
          {(provided,snapshot) => {
            return (
              <div
                className={`todos ${snapshot.isDraggingOver?"dragactive":""}`} 
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <span className="todos_heading">Active Tasks</span>
                {tasks.map((task, index) => {
                  return !task.completed && (
                    <SingleTodo
                      task={task}
                      key={task.id}
                      setTasks={setTasks}
                      tasks={tasks}
                      index={index}
                      markAsComplete={markAsComplete}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable droppableId="todosRemove">
          {(provided,snapshot) => {
            return (
              <div
                className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`} 
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <span className="todos_heading">Completed Tasks</span>
                {tasks.map((task, index) => {
                  return task.completed && (
                    <SingleTodo
                      task={task}
                      key={task.id}
                      setTasks={setTasks}
                      tasks={tasks}
                      index={index}
                      markAsComplete={markAsComplete}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </>
  );
};

export default TaskList;
