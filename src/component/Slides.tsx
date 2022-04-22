import React from 'react'
import Card from '../element/Card'


interface IProps {
  toDo: ToDo;
}



function Slides ({ toDo }: IProps) {
  const { id, _id } = toDo

  return (
    <>

    <div className="flex justify-center items-center flex-col">
      <Card src={_id} shape="2" id={id} />

    </div>

    </>
  )
}

export default Slides
