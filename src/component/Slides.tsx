import { useDispatch } from 'react-redux'
import saveAs from 'file-saver'
import { action } from '../redux/modules/toDoList'
import Card from '../element/Card'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import ModalContents from './ModalContents'

interface IProps {
  toDo: ToDo;
}

const IconBtn = tw.button`
 p-1.5 border border-gray-600 mx-1 rounded-sm text-gray-500
`

const TextBtn = tw.button`
 px-2 py-[0.15rem] border border-gray-200 mx-1 rounded-sm text-gray-500
`

function Slides ({ toDo }: IProps) {
  const { id, _id, checked } = toDo
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onToggle = (event: any) => {
    dispatch(action.toggleToDo({ id, checked: event.target.checked as boolean }))
  }

  const onDeleteToDo = () => {
    dispatch(action.deleteToDo({ checked }))
    navigate('/', { replace: true })
  }

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

    <div className="flex justify-center items-center flex-col">

      <Card src={_id} onClick={controlModal} shape="2" />

    </div>
    <TextBtn onClick={downloadToDo}>
      <svg viewBox="64 64 896 896" focusable="false" data-icon="download" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg> 다운로드</TextBtn>

    <IconBtn onClick={onlyOneDeleteToDo}><svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" fill="currentColor"></path></svg></IconBtn>
    </>
  )
}

export default Slides
