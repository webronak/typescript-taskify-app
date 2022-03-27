import React, { useRef } from 'react'
import "./styles.css";

interface Props{
    setTaskToAdd:React.Dispatch<React.SetStateAction<string>>;
    taskToAdd:string;
    handleAddClick: (e: React.FormEvent<EventTarget>) => void;
}

const InputTab = ({setTaskToAdd, taskToAdd, handleAddClick}:Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='input' onSubmit={(e) => {
      handleAddClick(e);
      inputRef.current?.blur();
    }}>
        <input type="text" placeholder='Add task...' className='input__box' onChange={e => setTaskToAdd(e.target.value)} value={taskToAdd} ref={inputRef} />
        <button type='submit' className='input_submit'>Add</button>
    </form>
  )
}

export default InputTab