import React from 'react'
import tw from 'tailwind-styled-components'

interface CardProps {
  shape: string;
  src?: string;
  onClick: Function;
  id: number
}

const SquareImage = tw.img`
object-cover object-center rounded-[2%] w-[22rem] h-[14.3rem]
shadow-md z-30 pointer-events-auto
`

const BigSquareImage = tw.img`
bg-center bg-contain w-full max-w-fit sm:h-[640px] md:h-[768px]
`

const Card = ({ shape = '1', src = 'https://resources.archisketch.com/images/Xx9q9qjFDF46D26A4A54BA5/550xAUTO/Xx9q9qjFDF46D26A4A54BA5.png', onClick = () => {}, id = 0 }: CardProps) => {
  if (shape === '1') {
    return <>

      <SquareImage src={src} onClick={onClick} id={id} />

      </>
  } else if (shape === '2') {
    return <BigSquareImage src={src} onClick={onClick} id={id} />
  }

  return null
}

Card.defaultProps = {
  shape: '1',
  src: 'https://resources.archisketch.com/images/Xx9q9qjFDF46D26A4A54BA5/550xAUTO/Xx9q9qjFDF46D26A4A54BA5.png',
  onClick: () => {},
  id: 0
}

export default Card
