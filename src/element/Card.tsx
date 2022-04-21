import React from 'react';
import tw from "tailwind-styled-components";

interface CardProps {
  shape: string;
  src?: string;
  onClick: Function
}


const SquareImage = tw.img`
object-cover object-center rounded-[2%] w-[20rem] h-[13rem]
hover:bg-gray-400 hover:opacity-70 shadow-md
`

const BigSquareImage = tw.img`
object-cover object-center rounded-md w-fit h-fit
`


const Card = ({ shape = "1", src = "https://resources.archisketch.com/images/Xx9q9qjFDF46D26A4A54BA5/550xAUTO/Xx9q9qjFDF46D26A4A54BA5.png", onClick= ()=>{}}: CardProps) => {

  
    if (shape === "1") {
      return <>

      <SquareImage src={src} onClick={onClick} />

      </>
    }

    else if (shape === "2") {
        return <BigSquareImage src={src} onClick={onClick} />
      }

    return null;
  };

Card.defaultProps = {
    shape: "1",
    src: "https://resources.archisketch.com/images/Xx9q9qjFDF46D26A4A54BA5/550xAUTO/Xx9q9qjFDF46D26A4A54BA5.png",
    onClick: ()=>{},
    };
        

export default Card;
