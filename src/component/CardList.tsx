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

const Subtitle = tw.div`
 tracking-widest inline-flex justify-start w-1/3 text-gray-500 text-sm gap-2
`


const SelectHidden = tw.div`
 w-1/3 justify-end text-right flex
`

const IconBtn = tw.button`
 p-1.5 border border-gray-200 mx-1 rounded-sm text-gray-500
`

const TextBtn = tw.button`
 px-2 py-[0.15rem] border border-gray-200 mx-1 rounded-sm text-gray-500
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
          setChecker(0)
      }) 
      
      }
      else if(rerender === false) {
        toDoList.forEach((x)=>{
          dispatch(action.toggleToDo({ id: x.id, checked: true}));
          setRerender(true)
          setChecker(toDoList.length)
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
  { checker > 0 ?  <><Subtitle>{checker} 개의 렌더 이미지 선택됨 <input type="checkbox" className="mt-1 ml-2" onChange={allToggle}/>  모두선택 </Subtitle></>  :  <Subtitle>{toDoList.length} 개의 렌더샷</Subtitle> }
   
    <Title>갤러리</Title>

    {checker > 0 ? <SelectHidden>
    <IconBtn onClick={downloadToDo}>
      <svg viewBox="64 64 896 896" focusable="false" data-icon="download" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg></IconBtn>

    <IconBtn onClick={onDeleteToDo}><svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" fill="currentColor"></path></svg></IconBtn>
    <TextBtn onClick={allToggle}>선택취소</TextBtn>
    
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
