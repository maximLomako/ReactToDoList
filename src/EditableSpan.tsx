import React, {useState} from "react";

type EditableSpanPropsType = {
  title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  return (
    editMode
      ? <input value={props.title}/>
      : <span>{props.title}---</span>
  )
}