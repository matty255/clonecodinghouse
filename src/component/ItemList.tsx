import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/configureStore'
import { action } from '../redux/modules/toDoList'
import saveAs from 'file-saver'
import Item from './Item'
import Icon from '../element/Icon'
import Swal from "sweetalert2";

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

function ItemList () {
  const dispatch = useDispatch()
  const [rerender, setRerender] = useState(false)
  const [checker, setChecker] = useState(0)


  const toDoList: ToDoList = useSelector((state: RootState) => state.toDoList.toDoList)

  const onDeleteToDo = () => {
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
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        dispatch(action.deleteToDo(toDoList))
      }
    })
    
  }

  const downloadToDo = (e:any) => {
    toDoList.forEach((x) => {
      if (x.checked === true) {
        console.log(x)
        saveAs(x._id, 'save.jpg')
      }
    })
  }

  const allToggle = (event: any) => {
    if (rerender === true) {
      toDoList.forEach((x) => {
        dispatch(action.toggleToDo({ id: x.id, checked: false }))
        setRerender(false)
        setChecker(0)

      })
    } else if (rerender === false) {
      toDoList.forEach((x) => {
        dispatch(action.toggleToDo({ id: x.id, checked: true }))
        setRerender(true)
        setChecker(toDoList.length)
      })
    }
  }

  const allCancel = (event: any) => {
    toDoList.forEach((x) => {
      dispatch(action.toggleToDo({ id: x.id, checked: false }))
      setRerender(false)
      setChecker(0)
    })
  }


  return (
    <>

    <Headers>
    <CloseBtn>

      <Icon name="cancel" iconSize={24} /></CloseBtn>

    </Headers>
 <TextBox>
  { checker > 0
    ? <><Subtitle>{checker} 개의 렌더 이미지 선택됨
    <input type="checkbox" className="mt-1 ml-2" onChange={allToggle}/>  모두선택 </Subtitle>
    </>
    : <Subtitle>{toDoList.length} 개의 렌더샷</Subtitle> }

    <Title>갤러리</Title>

    {checker > 0
      ? <SelectHidden>
    <IconBtn onClick={downloadToDo}>
    <Icon name="download" iconSize={14} /></IconBtn>

    <IconBtn onClick={onDeleteToDo}><Icon name="delete" iconSize={14} /></IconBtn>
    <TextBtn onClick={allCancel}>선택취소</TextBtn>

    </SelectHidden>
      : ''
  }
    </TextBox>
    <CardBox>

      {toDoList && rerender && toDoList.map((toDo) =>
      <div key={toDo.id}><Item toDo={toDo} checker={checker} setChecker={setChecker} /></div>)}

      {toDoList && !rerender && toDoList.map((toDo) =>
      <div key={toDo.id}><Item toDo={toDo} checker={checker} setChecker={setChecker} /></div>)}

    </CardBox>

    </>
  )
}

export default ItemList
