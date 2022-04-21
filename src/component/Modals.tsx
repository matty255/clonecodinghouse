import { useSelector } from 'react-redux'

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { RootState } from '../redux/configureStore'

import Slides from './Slides'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface IProps {
    toDo: {
        id: number,
        _id:string,
        checked:boolean
    }
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

function ModalContents ({ toDo }: IProps) {
  const { id } = toDo

  // const sliderRef = useRef();

  const [slideIndex, setSlideIndex] = useState(id)

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slideIndex,
    arrows: false

  }

  const toDoList: ToDoList = useSelector((state: RootState) => state.toDoList.toDoList)

  const prev = () => {
    if (slideIndex < 0) {
      return
    }
    setSlideIndex(slideIndex - 1)
    Customs.current.slickGoTo(slideIndex, true)
    console.log(slideIndex)
  }
  const next = () => {
    if (slideIndex >= toDoList.length) {
      return
    }
    setSlideIndex(slideIndex + 1)
    Customs.current.slickGoTo(slideIndex, true)
  }

  return (
    <>

      <div className="flex-row flex">

                <PrevBtn onClick={prev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.707 17.293L8.414 13 18 13 18 11 8.414 11 12.707 6.707 11.293 5.293 4.586 12 11.293 18.707z" fill="currentColor"></path></svg>
                </PrevBtn>

                <Customs {...settings} ref={Customs}>
                  {toDoList &&
                  toDoList.map((toDo, index) =>
                  <>

                  <div key={toDo.id}>
                    <Slides toDo={toDo} />
                  </div>
                  </>
                  )}
                </Customs>

                <NextBtn onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z" fill="currentColor"></path></svg>

                </NextBtn>
            </div>

    </>
  )
}

export default ModalContents
