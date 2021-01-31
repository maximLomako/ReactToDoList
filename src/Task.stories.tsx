import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
        task={{id: '1', isDone: true, title: 'html'}}
        todolistId={'1'}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}/>
      <Task
        task={{id: '2', isDone: false, title: 'css'}}
        todolistId={'2'}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}/>
    </>
  )
}