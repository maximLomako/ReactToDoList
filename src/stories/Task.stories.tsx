import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
  title: 'Task Component',
  component: Task
}

const changeTaskStatus = action(`Status changed`);
const changeTaskTitle = action(`Title changed`);
const removeTask = action(`Task removed`);

export const TaskBaseExample = (props: any) => {
  return (
    <>
      <Task
        task={{
          id: '1', status: TaskStatuses.Completed, title: 'html', todoListId: 'todolistId1',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
        }}
        todolistId={'1'}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}/>
      <Task
        task={{
          id: '2', status: TaskStatuses.New, title: 'css', todoListId: 'todolistId1',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
        }}
        todolistId={'2'}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}/>
    </>
  )
}