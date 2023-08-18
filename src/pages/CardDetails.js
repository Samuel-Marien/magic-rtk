import React from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'

const CardDetails = () => {
  let { id } = useParams()
  // console.log(id)
  return (
    <div>
      <Navbar />
      {id}
    </div>
  )
}

export default CardDetails
