import { createAction, createReducer } from "@reduxjs/toolkit";
import data from '../../test.json'

export const action = {
  toggleToDo: createAction<IToggleToDoPayload>("TOGGLE/TO_DO"),
  deleteToDo: createAction<IDeleteToDoPayload>("DELETE/TO_DO"),
  dToDo: createAction<IDToDoPayload>("D/TO_DO"),
};
const a = data.renderings
const initialState: IToDoListState = {
  
  toDoList: Array.from({ length: a.length }, (_id, k) => _id).map(
      (_id, k) => 
  ({

    id: k,
    _id:a[k]._id,
    checked: false,
}))
};

export const reducer = {
  toggleToDo: (state: IToDoListState, action: IToggleToDoAction) => {
    state.toDoList.find((todo: ToDo) => todo.id === action.payload.id).checked = action.payload.checked;
  },
  deleteToDo: (state: IToDoListState, action: IDeleteToDoAction) => {
    state.toDoList = state.toDoList.filter((todo: ToDo) => todo.checked === false)
  },
  dToDo: (state: IToDoListState, action: IDToDoAction) => {
    state.toDoList = state.toDoList.filter((todo: ToDo) => todo.id !== action.payload.id);
  },

};

const toDoListReducer = createReducer(initialState, builder => {
  builder
    .addCase(action.toggleToDo, reducer.toggleToDo)
    .addCase(action.deleteToDo, reducer.deleteToDo)
    .addCase(action.dToDo, reducer.dToDo)
});


export default toDoListReducer;