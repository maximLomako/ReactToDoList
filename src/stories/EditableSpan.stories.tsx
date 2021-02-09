import React from "react";

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
  title: 'EditableSpan Component',
  component: EditableSpan
}

const callBack = action(`Title value changed`);

export const EditableSpanBaseExample = (props: any) => {
  return (
    <EditableSpan title={'Start value'} onChange={callBack}/>
  )
}