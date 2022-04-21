import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import saveAs from 'file-saver'
import { action } from "../redux/modules/toDoList";
import Card from "../element/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, createRef } from "react";
import tw from "tailwind-styled-components";
import { RootState } from "../redux/configureStore";
import Slides from "./Slides"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IProps {
    toDo: {
        id: number,
        _id:string,
        checked:boolean
    } 
}

export const Customs = tw(Slider)`
mx-auto w-3/4
`;

const PrevBtn = tw.button`
  z-10 text-white
`;

const NextBtn = tw.button`
  z-10 text-white
`;

function ModalContents({ toDo }: IProps) {
    const { id, _id, checked } = toDo;


    // const sliderRef = useRef();

  const [slideIndex, setSlideIndex] = useState(id)
  console.log(slideIndex)
  const [updateCount, setUpdateCount] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onToggle = (event: any) => {
    dispatch(action.toggleToDo({ id, checked: event.target.checked as boolean }));
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

  	const settings = {
    	dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: slideIndex,
        arrows :false

    };
    

    const toDoList: ToDoList = useSelector((state: RootState) => state.toDoList.toDoList);

    const prev = () => {
        if (slideIndex < 0) {
            return
        }
        setSlideIndex(slideIndex -1)
        Customs.current.slickGoTo(slideIndex, true)
        console.log(slideIndex)
    }
    const next = () => {
        if (slideIndex >= toDoList.length) {
            return
        }
        setSlideIndex(slideIndex +1)
        Customs.current.slickGoTo(slideIndex, true)
    
    }


  return (
    <>

<div className="flex-row hidden md:flex">
    
                <PrevBtn onClick={prev}>
                    이전
                </PrevBtn>
    	<Customs {...settings} ref={Customs}>
        {toDoList && toDoList.map((toDo, index) => <div key={toDo.id}><Slides toDo={toDo} /></div>)}
        </Customs>
        <NextBtn onClick={next}>
                   다음
                </NextBtn>
            </div>


            
    </>
  );
}

export default ModalContents;