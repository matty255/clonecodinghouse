import { useDispatch } from 'react-redux'
import saveAs from 'file-saver'
import { action } from '../redux/modules/toDoList'
import Card from '../element/Card'

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import Modals from './Modals'
import Icon from '../element/Icon'

interface IProps {
  toDo: ToDo;

  checker: number,
  setChecker: Function

}

const Headers = tw.div`
fixed h-14 w-full border-b border-gray-200 justify-start items-center gap-3 p-2
`

const CloseBtn = tw.button`
fixed bg-gray-100 h-8 w-14 rounded-[10%] px-4 text-gray-600 
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
text-left hover:bg-gray-100 p-1 px-2 z-20
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
    dispatch(action.dToDo({ id }))
  }

  const downloadToDo = (e:any) => {
    saveAs(_id, 'save.jpg') // Put your image url here.
  }

  const controlModal = (e:any) => {
    if (e.target !== e.currentTarget) {
      return
    }
    setModal(state => !state)

    // console.log(id)
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
    <Headers>
    <CloseBtn onClick={controlModal}>
     <Icon name="cancel" iconSize={24} />
     </CloseBtn>
    </Headers>
      <Modals toDo={toDo} />
    </ModalCover>
    }

    </>
  )
}

export default Item
