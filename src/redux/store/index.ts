//import redux func
import { configureStore } from "@reduxjs/toolkit";

//import selector & selector data type
import { TypedUseSelectorHook, useSelector } from "react-redux";

//import todoSlice
import todoSlice from "../slices/todoSlice";

//create store
export function makeStore() {
  return configureStore({
    reducer: {
      todo: todoSlice,
    },
  });
}

export const store = makeStore();

//export store type
export type RootState = ReturnType<typeof store.getState>;

//export dispatch type
export type AppDispatch = typeof store.dispatch;

//export useAppSelector to replace useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
