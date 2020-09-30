import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

  let task1: Array<TaskType> = [
    {id: 1, title: 'css', isDone: true},
    {id: 2, title: 'html', isDone: true},
    {id: 3, title: 'react', isDone: false}
  ]

  let task2: Array<TaskType> = [
    {id: 1, title: 'terminator', isDone: false},
    {id: 2, title: 'xxx', isDone: true},
    {id: 3, title: 'harry potter', isDone: true}
  ]


  return (
    <div className='App'>
      <Todolist title='What to learn' tasks={task1}/>
      <Todolist title='Movies' tasks={task2}/>
    </div>
  );
}

export default App;
