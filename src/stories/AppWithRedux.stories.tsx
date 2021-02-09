import React from "react";

import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'AppWithRedux Component',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}

const callBack = action(`Title value changed`);

export const AppWithReduxExample = (props: any) => {
  return (
    <AppWithRedux/>
  )
}