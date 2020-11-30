import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void

}

const AddItemForm = (props: AddItemFormPropsType) => {

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle)
      setNewTaskTitle('')
      setError(null);
    } else {
      setError('Title is required');
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.ctrlKey === true && e.key === 'Enter' && newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    }
  }
  return (
    <div>
      <input value={newTaskTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyChangeHandler}
             className={error ? 'error' : ''}
      />

      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default AddItemForm;

