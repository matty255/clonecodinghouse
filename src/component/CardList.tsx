import React, {useEffect, useState} from 'react';
import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";

import Item from "./Item";
import { RootState } from "../redux/configureStore";
import { useDispatch } from "react-redux";

import { action } from "../redux/modules/toDoList";

import { useNavigate } from "react-router-dom";
import saveAs from 'file-saver'
import useToggle from '../hooks/useToggle';

const CardBox = tw.div`
flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-start items-center gap-[1.1rem] w-11/12 mx-auto
`
const Headers = tw.div`
flex h-12  border-b border-gray-200 justify-start items-center gap-3 p-2
`

const CloseBtn = tw.button`
flex justify-start items-start bg-gray-100 h-8 w-11 rounded-[10%] px-2.5 pt-1 text-gray-600
`

const TextBox = tw.div`
w-11/12 h-20 flex items-center pb-4 mx-auto
`

const Title = tw.h1`
font-bold text-lg text-gray-800 w-1/3 flex justify-center
`

const Subtitle = tw.h2`
 tracking-widest inline-flex justify-start w-1/3 text-gray-500 text-sm
`

const SelectHidden = tw.div`
 w-1/3 justify-end text-right
`




function CardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false)
  const [checker, setChecker] = useState(0)
  console.log(checker)

    const toDoList: ToDoList = useSelector((state: RootState) => state.toDoList.toDoList);
    // console.log(toDoList)
    const onDeleteToDo = () => {
      dispatch(action.deleteToDo(toDoList));
      navigate("/",  { replace: true })
    };

    const downloadToDo = (e:any) => {
    toDoList.forEach((x)=>{
 
      if (x.checked === true) {
        console.log(x)
        saveAs(x._id, 'save.jpg')
      } 
    })     

    };


    const allToggle = (event: any) => {
      
      if(rerender === true) {
        toDoList.forEach((x)=>{
          dispatch(action.toggleToDo({ id: x.id, checked: false}));
          setRerender(false)
      }) 
      
      }
      else if(rerender === false) {
        toDoList.forEach((x)=>{
          dispatch(action.toggleToDo({ id: x.id, checked: true}));
          setRerender(true)
        }) 
      }
 
    };





  return (
    <>

    <Headers>
    <CloseBtn>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.192 6.344l-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" fill="currentColor"></path></svg></CloseBtn>


    </Headers>
<TextBox>
  { checker >= 0 ?  <Subtitle>{checker} 개의 렌더샷이 선택되었습니다.</Subtitle>  :  <Subtitle>{toDoList.length} 개의 렌더샷</Subtitle> }
   
    <Title>갤러리</Title>

    {checker > 0 ? <SelectHidden>
    <button onClick={downloadToDo}>다운로드</button>
    <button onClick={onDeleteToDo}>삭제</button>
    <button onClick={allToggle}>모두선택/선택해제</button>
    </SelectHidden> : ""
}
    </TextBox>
    <CardBox>
    
      {toDoList && rerender && toDoList.map((toDo) => <div key={toDo.id}><Item toDo={toDo} checker={checker} setChecker={setChecker}  /></div>)}

      {toDoList && !rerender && toDoList.map((toDo) => <div key={toDo.id}><Item toDo={toDo} checker={checker} setChecker={setChecker}  /></div>)}


    </CardBox>

    </>
  );
}

export default CardList;
