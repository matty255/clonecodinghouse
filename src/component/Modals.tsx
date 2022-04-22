import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import tw from 'tailwind-styled-components'
import { RootState } from '../redux/configureStore'
import { action } from '../redux/modules/toDoList'
import Icon from '../element/Icon'
import Slides from './Slides'
import Slider from 'react-slick'
import saveAs from 'file-saver'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface IProps {
    toDo: {
        id: number,
        _id:string,
        checked:boolean
    }
    crn_id: number
}

export const Customs = tw(Slider)`
mx-auto w-full h-screen -z-20
`

const PrevBtn = tw.button`
  z-10 text-gray-500 fixed left-10 top-1/2 bg-gray-100 rounded-md p-2
`

const NextBtn = tw.button`
  z-10 text-gray-500 fixed right-10 top-1/2 bg-gray-100 rounded-md p-2
`

const FlexBox = tw.div`
 flex justify-end flex-row m-4
`

const IconBtn = tw.button`
 p-1.5 border border-gray-200 mx-1 rounded-sm text-gray-500 cursor-pointer
`

const TextBtn = tw.button`
 px-2 py-[0.15rem] border border-gray-200 mx-1 rounded-sm text-gray-500 w-28 flex justify-center flex-row items-center 
`

function Modals ({ toDo, crn_id }: IProps) {
  const { id, _id } = toDo

  const dispatch = useDispatch()

  const toDoList: ToDoList = useSelector((state: RootState) => state.toDoList.toDoList)
  const slideArray = Array.from({ length: toDoList.length }, (_id, k) => _id).map(
    (_id, k) =>
      ({
        id: k,
        _id: toDoList[k]._id,
        checked: toDoList[k].checked
      }))
      const customs = useRef<Slider>();

  const [slideIndex, setSlideIndex] = useState(crn_id)
  const [render, setRender] = useState(false)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slideIndex,
    arrows: false

  }

  // const setIndexToDo = () => {
  //   slideArray.forEach((x) => {
  //     if (x._id === _id) {
  //       setSlideIndex(x.id)
  //     }
  //   })
  // }

  const downloadToDo = () => {
    if (render === false) {
      slideArray.forEach((x) => {
        if (x.id === slideIndex) {
          console.log(x.id, slideIndex)
          saveAs(x._id, 'save.jpg')
        }
      })
    } else {
      slideArray.forEach((x) => {
        if (x.id === slideIndex -1) {
          console.log(x.id, slideIndex)
          saveAs(x._id, 'save.jpg')
        }
      })
    }

  }

  const onlyOneDeleteToDo = () => {
    if (render === false) {
    slideArray.forEach((x) => {
      if (x.id === slideIndex) {
        let _id = x._id
        dispatch(action.dToDo({_id}))
      }
    })
    } else {
      slideArray.forEach((x) => {
        if (x.id === slideIndex -1) {
          let _id = x._id
          console.log(x.id, slideIndex)
          dispatch(action.dToDo({_id}))
        }
      })
    }
    slideArray.filter((todo: ToDo) => todo.id !== id)

  }

  // useEffect(() => {
  //     setIndexToDo()
  // }, [])
  
  const prev = (e:any) => {
    if (slideIndex < 0) {
      return
    }
    else if (customs.current === undefined) {
      return
    }
    setSlideIndex(slideIndex - 1)
    customs.current.slickGoTo(slideIndex, true)
    setRender(true)
    

  }
  const next = (e:any) => {
    if (slideIndex >= slideArray.length) {
      return 
    }
    else if (customs.current === undefined) {
      return
    }

    else {
      setSlideIndex(slideIndex + 1)
      console.log(slideIndex)
      customs.current.slickGoTo(slideIndex, true)
      setRender(true)
    }
    
  }

  return (
    <>
    <FlexBox>
    <TextBtn onClick={downloadToDo}>
      <Icon name="download" iconSize={14} /> <span className="text-sm">다운로드</span></TextBtn>
    <IconBtn onClick={onlyOneDeleteToDo}> <Icon name="delete" iconSize={14} /></IconBtn>
    </FlexBox>
      <div className="flex flex-row">

                <PrevBtn onClick={prev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.707 17.293L8.414 13 18 13 18 11 8.414 11 12.707 6.707 11.293 5.293 4.586 12 11.293 18.707z" fill="currentColor"></path></svg>
                </PrevBtn>

                <Customs {...settings} ref={customs}>
                  {slideArray &&
                  slideArray.map((toDo, index) =>
      
                  <div key={toDo.id}>
                    <Slides toDo={toDo} />
                  </div>
                  
                  )}
                </Customs>

                <NextBtn onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z" fill="currentColor"></path></svg>

                </NextBtn>
            </div>

    </>
  )
}

export default Modals
