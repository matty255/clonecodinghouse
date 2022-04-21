import { useDispatch } from 'react-redux'
import saveAs from 'file-saver'
import { action } from '../redux/modules/toDoList'
import Card from '../element/Card'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import Icon from '../element/Icon'

interface IProps {
  toDo: ToDo;
}

const FlexBox = tw.div`
 flex justify-end flex-row m-4
`

const IconBtn = tw.button`
 p-1.5 border border-gray-200 mx-1 rounded-sm text-gray-500 pointer-events-auto
`

const TextBtn = tw.button`
 px-2 py-[0.15rem] border border-gray-200 mx-1 rounded-sm text-gray-500 w-28 flex justify-center flex-row items-center 
`

function Slides ({ toDo }: IProps) {
  const { id, _id } = toDo
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onlyOneDeleteToDo = () => {
    dispatch(action.dToDo({ id }))
    navigate('/', { replace: true })
  }

  const downloadToDo = (e:any) => {
    saveAs(_id, 'save.jpg') // Put your image url here.
  }

  const controlModal = (e:any) => {
    setModal(state => !state)
    console.log(modal)
  }

  return (
    <>
    <FlexBox>
    <TextBtn onClick={downloadToDo}>
      <Icon name="download" iconSize={14} /> <span className="text-sm">다운로드</span></TextBtn>
    <IconBtn onClick={onlyOneDeleteToDo}> <Icon name="delete" iconSize={14} /></IconBtn>
    </FlexBox>
    <div className="flex justify-center items-center flex-col">
      <Card src={_id} onClick={controlModal} shape="2" />

    </div>

    </>
  )
}

export default Slides
