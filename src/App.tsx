import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
  id: string
  title: string
  filter: 'all' | 'completed' | 'active'
}

function App() {
  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks({...tasksObj});
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    {id: todolistId1, title: 'Whats to lear', filter: 'active'},
    {id: todolistId2, title: 'What to do', filter: 'completed'}
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId]
    setTasks({...tasksObj});

  }

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      {id: v1(), title: 'css', isDone: true},
      {id: v1(), title: 'html', isDone: true},
      {id: v1(), title: 'react', isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: 'made 15 game', isDone: true},
      {id: v1(), title: 'lear tuesday program react in 2 weeks', isDone: true},
    ],

  })


  return (

    <div className='App'>
      {
        todolists.map(tl => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }

          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }

          return <Todolist key={tl.id}
                           id={tl.id}
                           title={tl.title}
                           tasks={tasksForTodolist}
                           addTask={addTask}
                           removeTask={removeTask}
                           changeTaskStatus={changeStatus}
                           changeFilter={changeFilter}
                           filter={tl.filter}
                           removeTodolist={removeTodolist}
          />
        })
      }

    </div>
  );
}

export default App;
