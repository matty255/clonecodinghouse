type ToDo = {
    id: number;
    content: string;
    _id: string;
    checked: boolean;
  };

  type ToDoList = ToDo[] | [];

  interface IToDoListState {
    toDoList: IToDoList;
  }

  interface IAction {
    type?: string;
  }

  interface IToggleToDoPayload {
    id: number;
    checked: boolean;
  }

  interface IToggleToDoAction extends IAction {
    payload: IToggleToDoPayload;
  }

  interface IDeleteToDoPayload {

  }

  interface IDeleteToDoAction extends IAction {
    payload: IDeleteToDoPayload;
  }

interface IDToDoPayload {
  id: number;
}

interface IDToDoAction extends IAction {
  payload: IDToDoPayload;
}
