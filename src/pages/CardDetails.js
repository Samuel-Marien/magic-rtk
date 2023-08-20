import React from 'react'
import { useParams } from 'react-router-dom'

import DetailedCardView from '../app/features/detailedCard/DetailedCardView'

import Navbar from '../components/Navbar'

const CardDetails = () => {
  let { id } = useParams()

  return (
    <div>
      <Navbar />
      <DetailedCardView id={id} />
    </div>
  )
}

export default CardDetails
