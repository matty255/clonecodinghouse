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
  
  checker: number,
  setChecker: Function

}


const Headers = tw.div`
flex h-14 border-b border-gray-200 justify-start items-center gap-3 p-2
`

const CloseBtn = tw.button`
flex justify-start items-start bg-gray-100 h-8 w-11 rounded-[10%] px-2.5 pt-1 text-gray-600
`

const ModalCover = tw.div`
w-full h-screen fixed bg-white inset-0 z-40
`



const CheckBox = tw.input`
absolute m-4 outline-none z-10
`

const DownloadBtn = tw.button`
 text-gray-900 z-10 absolute sm:ml-36 lg:ml-48 xl:ml-60 mt-4
`
const DownloadBox = tw.div`
absolute sm:ml-36 lg:ml-28 xl:ml-40 mt-10 z-20 
`

const DownloadInnerBox = tw.div`
flex flex-col bg-white text-gray-400 gap-1 rounded-sm py-1
`

const MenuBtns = tw.button`
text-left hover:bg-gray-100 p-1 px-2 
`

function Item({ toDo, checker, setChecker }: IProps) {
  const { id, _id, checked } = toDo;
  const [modal, setModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onToggle = (event: any) => {
    dispatch(action.toggleToDo({ id, checked: event.target.checked as boolean }));
    setChecker(checker +1)
    if(checked === true) {
      return setChecker(checker -1)
    }
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
    console.log(id)
  };

  const controlMenu = (e:any) => {
    setShowMenu(state => !state)
  }


  return (
    <>
  

      {/* <div>{id}</div> */}
      {/* <p>{content}</p> */}

      <CheckBox type="checkbox" defaultChecked={checked} onChange={onToggle} />
      <DownloadBtn onClick={controlMenu}><svg viewBox="64 64 896 896" focusable="false" data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z" fill="currentColor"></path></svg></DownloadBtn>

      { showMenu && <>
      <DownloadBox>
        <DownloadInnerBox>

      <MenuBtns onClick={downloadToDo}>다운로드</MenuBtns>
      <MenuBtns onClick={onlyOneDeleteToDo}>삭제</MenuBtns>
      </DownloadInnerBox>
      </DownloadBox>
      </>}

      <Card src={_id} onClick={controlModal} />
      



    { modal &&
    <ModalCover>

    <Headers>
    <CloseBtn  onClick={controlModal}>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.192 6.344l-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" fill="currentColor"></path></svg></CloseBtn>


    </Headers>
      <ModalContents toDo={toDo} />

    </ModalCover>
    }

    </>
  );
}

export default Item;