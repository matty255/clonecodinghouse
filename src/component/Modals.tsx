import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import tw from 'tailwind-styled-components'
import { RootState } from '../redux/configureStore'
import { action } from '../redux/modules/toDoList'
import Icon from '../element/Icon'
import Slides from './Slides'
import Slider from 'react-slick'
import saveAs from 'file-saver'
import Swal from "sweetalert2";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface IProps {
    toDo: {
        id: number,
        _id:string,
        checked:boolean
    }
    crn_id: number,
    art_id: string,
}

export const Customs = tw(Slider)`
mx-auto w-full h-screen -z-20
`

const PrevBtn = tw.button`
  z-10 text-gray-500 fixed left-10 top-1/2 bg-gray-100 rounded-md p-2 transi
  ${(props:any) => (props.disabled === true ? `hidden` : "")};
`

const NextBtn = tw.button`
  z-10 text-gray-500 fixed right-10 top-1/2 bg-gray-100 rounded-md p-2
  ${(props:any) => (props.disabled === true ? `hidden` : "")};
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

function Modals ({ toDo, crn_id, art_id }: IProps) {
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
  const [renderPrev, setRenderPrev] = useState(false)
  const [renderNext, setRenderNext] = useState(false)
  const [render, setRender] = useState(true)


  const setIndexToDo = () => {
    slideArray.forEach((x) => {
      if (x._id === art_id) {
        setSlideIndex(x.id)
        console.log(x.id)
      }
    })
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slideIndex,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />

  }

  const downloadToDo = () => {
    if (renderNext === false && renderPrev === false) {
      slideArray.forEach((x) => {
        if (x.id === slideIndex) {
          console.log(x.id, slideIndex)
          saveAs(x._id, 'save.jpg')
        }
      })
    } else if (renderNext === true) {
      slideArray.forEach((x) => {
        if (x.id === slideIndex -1) {
          // console.log(x.id, slideIndex)
          saveAs(x._id, 'save.jpg')
        }
      })
    } else if (renderPrev === true) {
      slideArray.forEach((x) => {
        if (x.id === slideIndex +1) {
          // console.log(x.id, slideIndex)
          saveAs(x._id, 'save.jpg')
        }
      })
    }

  }

  const onlyOneDeleteToDo = () => {
    Swal.fire({
      html:
      '<img src="https://resources.archisketch.com/editor/assets_test/img/pop-up/gallery_delete@2x.gif" alt="gallery_delete"></img>' +
      `<div> 이 파일을 삭제하시겠어요? </div>
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
        if (renderNext === false && renderPrev === false) {
          slideArray.forEach((x) => {
            if (x.id === slideIndex) {
              let _id = x._id
              dispatch(action.dToDo({_id}))
            }
          })
          } else if (renderNext === true)  {
            slideArray.forEach((x) => {
              if (x.id === slideIndex -1) {
                let _id = x._id
                // console.log(x.id, slideIndex)
                dispatch(action.dToDo({_id}))
              }
            })
          } else if (renderPrev === true)  {
            slideArray.forEach((x) => {
              if (x.id === slideIndex +1) {
                let _id = x._id
                // console.log(x.id, slideIndex)
                dispatch(action.dToDo({_id}))
              }
            })
          }
          slideArray.filter((todo: ToDo) => todo.id !== id)
      
      }
    })
    
  
    
  }

  useEffect(() => {

    const aaa = setTimeout(() => {
      setIndexToDo()
      setRender(false)
  }, 200);
  }, [render])
  
  const prev = () => {
    if (slideIndex < 0) {
      return
    }
    else if (customs.current === undefined) {
      return
    }
    else{
      setSlideIndex((slideIndex) => slideIndex -1)
      const aaa = setTimeout(() => {
        customs.current?.slickGoTo(slideIndex, true)
        console.log(slideIndex)
    }, 100);
      
      setRenderNext(false)
      setRenderPrev(true)
    }


  }
  const next = () => {
    if (slideIndex >= slideArray.length) {
      return 
    }
    else if (customs.current === undefined) {
      return
    }
    else {
      setSlideIndex((slideIndex) => slideIndex +1)
      const aaa = setTimeout(() => {
        customs.current?.slickGoTo(slideIndex, true)
        console.log(slideIndex)
    }, 100);
      setRenderNext(true)
      setRenderPrev(false)
    }
    
  }

  return (
    <>
    <FlexBox>
      <TextBtn onClick={downloadToDo}>
        <Icon name="download" iconSize={14} /> <span className="text-sm">다운로드</span>
      </TextBtn>
      <IconBtn onClick={onlyOneDeleteToDo}> <Icon name="delete" iconSize={14} /></IconBtn>
    </FlexBox>
    {render ? "" :  <div className="flex flex-row">

    <PrevBtn onClick={prev} disabled={slideIndex === -1}>
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

    <NextBtn onClick={next} disabled={slideIndex === slideArray.length}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z" fill="currentColor"></path></svg>
    </NextBtn>
    </div>}
     
    </>
  )
}

export default Modals
