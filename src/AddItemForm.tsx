import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField, IconButton, Icon} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType = {
  addItem: (title: string) => void

}

const AddItemForm = (props: AddItemFormPropsType) => {

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

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
    setError(false)
    if (e.ctrlKey === true && e.key === 'Enter' && newTaskTitle.trim() !== '') {
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
        <AddCircleOutlineIcon />
      </IconButton>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default AddItemForm;

