import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'css', isDone: true},
    {id: v1(), title: 'html', isDone: true},
    {id: v1(), title: 'react', isDone: false}
  ]);
  let [filter, setFilter] = useState<FilterValuesType>('all');


  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }


  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks]);
  }

  let tasksForTodolist = tasks;
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }


  return (
    <div className='App'>
      <Todolist title='What to learn'
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeStatus}
                changeFilter={changeFilter}
                filter={filter}

      />
    </div>
  );
}

export default App;
