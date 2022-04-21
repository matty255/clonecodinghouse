import { useDispatch } from "react-redux";
import saveAs from 'file-saver'
import { action } from "../redux/modules/toDoList";
import Card from "../element/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import ModalContents from "./ModalContents"

interface IProps {
  toDo: ToDo;
}



function Slides({ toDo }: IProps) {
  const { id, _id, checked } = toDo;
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onToggle = (event: any) => {
    dispatch(action.toggleToDo({ id, checked: event.target.checked as boolean }));
  };


  const onDeleteToDo = () => {
    dispatch(action.deleteToDo({checked}));
    navigate("/",  { replace: true })
  };

  const onlyOneDeleteToDo = () => {
    dispatch(action.dToDo({id}));
    navigate("/",  { replace: true })
  };

  const downloadToDo = (e:any) => {
    saveAs(_id, 'save.jpg') // Put your image url here.
  };

  const controlModal = (e:any) => {
    setModal(state => !state)
    console.log(modal)
  };

  return (
    <>
    <div className="flex justify-center items-center flex-col">

      <Card src={_id} onClick={controlModal} shape="2" />
      <input type="checkbox" defaultChecked={checked} onChange={onToggle} />

      <button onClick={onlyOneDeleteToDo}>하나만삭제</button>
      <button onClick={downloadToDo}>다운로드</button>
    </div>

    </>
  );
}

export default Slides;