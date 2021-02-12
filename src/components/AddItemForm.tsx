import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType = {
  addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<boolean | null>(false);
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle)
      setNewTaskTitle('')
      setError(false);
    } else {
      setError(true);
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.ctrlKey && e.key === 'Enter' && newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    }
  }
  return (
    <div>
      <TextField style={{padding: "10px"}} id={error ? 'standard-error' : "standard-basic"}
                 label="Type value"
                 variant="outlined"
                 value={newTaskTitle}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyChangeHandler}
                 error={!!error}
                 helperText={error ? 'Incorrect entry.' : ""}
      />

      <IconButton onClick={addTask} color="primary">
        <AddCircleOutlineIcon/>
      </IconButton>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
});

