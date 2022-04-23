import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { action } from '../redux/modules/toDoList'
import saveAs from 'file-saver'
import tw from 'tailwind-styled-components'
import Card from '../element/Card'
import Modals from './Modals'
import Icon from '../element/Icon'
import Swal from "sweetalert2";

interface IProps {
  toDo: ToDo;
  checker: number,
  setChecker: Function

}


const CloseBtn = tw.div`
fixed bg-gray-100 h-8 w-12 rounded-[10%] px-3 pt-1 text-gray-600 inset-3 cursor-pointer
`

const ModalCover = tw.div`
w-full h-screen fixed bg-white inset-0 z-40
`

const CheckBox = tw.input`
absolute m-4 outline-none text-lg text-dpurple-200 w-7 h-7 font-min2
rounded-md border-2 hover:border-durple-200 disabled:text-gray-300 
disabled:bg-gray-200 disabled:border-0
${(props:any) => (props.selected ? 'opacity-100' : '')};
`

const DownloadBtn = tw.button`
 text-white z-10 absolute right-6 mt-4
`
const DownloadBox = tw.div`
absolute sm:ml-36 lg:ml-36 xl:ml-52 mt-10 z-20 
`

const DownloadInnerBox = tw.div`
flex flex-col bg-white text-gray-400 gap-1 rounded-sm py-1
`

const MenuBtns = tw.button`
text-left hover:bg-gray-100 p-1 px-2 z-auto
`

const Hidden = tw.div`
  opacity-0 hover:opacity-70 h-[14.3rem] md:w-[29.3%] lg:w-[22%] 2xl:w-[17.58%] absolute 
  hover:bg-gray-500 rounded-[2%] cursor-pointer pointer-events-auto
`

function Item ({ toDo, checker, setChecker }: IProps) {
  const { id, _id, checked } = toDo
  const [modal, setModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()

  const onToggle = (event: any) => {
    dispatch(action.toggleToDo({ id, checked: event.target.checked as boolean }))
    setChecker(checker + 1)

    if (checked === true) {
      return setChecker(checker - 1)
    }
  }
  

  const onlyOneDeleteToDo = () => {
    Swal.fire({
      html:
      '<img src="https://resources.archisketch.com/editor/assets_test/img/pop-up/gallery_delete@2x.gif" alt="gallery_delete"></img>' +
      `<div> ${checker}개의 선택된 파일을 삭제하시겠어요? </div>
      <div> 삭제하면 되돌릴 수 없습니다 </div>`,
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '삭제 완료!',
          '성공적으로 삭제되었습니다.',
          'success'
        )
        dispatch(action.dToDo({ _id }))
      }
    })
    
    
  }

  const downloadToDo = (e:any) => {
    saveAs(_id, 'save.jpg') // Put your image url here.
  }

  const controlModal = (e:any) => {
    if (e.target !== e.currentTarget) {
      return
    }
    setModal(state => !state)
  }

  const controlMenu = (e:any) => {
    setShowMenu(state => !state)
  }

  return (
    <>
    {checked && <CheckBox type="checkbox" defaultChecked={checked} onChange={onToggle} selected={checked} />}

    <Hidden onClick={controlModal}>

      <CheckBox type="checkbox" defaultChecked={checked} onChange={onToggle} />

      <DownloadBtn onClick={controlMenu}><Icon name="dots" iconSize={24} /></DownloadBtn>

      </Hidden>
      { showMenu && <>
      <DownloadBox>
        <DownloadInnerBox>

      <MenuBtns onClick={downloadToDo}>다운로드</MenuBtns>
      <MenuBtns onClick={onlyOneDeleteToDo}>삭제</MenuBtns>
      </DownloadInnerBox>
      </DownloadBox>
      </>}

      <Card src={_id} />

    { modal &&

    <ModalCover>

    <CloseBtn onClick={controlModal}>
     <Icon name="cancel" iconSize={24} />
     </CloseBtn>

      <Modals toDo={toDo} crn_id={id} art_id={_id} />
    </ModalCover>
    }

    </>
  )
}

export default Item
