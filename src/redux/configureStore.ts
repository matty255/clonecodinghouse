import { configureStore } from "@reduxjs/toolkit";

import toDoListReducer from "./modules/toDoList";

export const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;