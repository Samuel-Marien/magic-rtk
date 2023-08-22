import React from 'react'
import { useParams } from 'react-router-dom'

import DetailedCardView from '../app/features/detailedCard/DetailedCardView'

import Navbar from '../components/Navbar'

const CardDetails = () => {
  let { id } = useParams()

  return (
    <div
      style={{
        height: '800px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url('../images/bg5.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <div style={{ marginTop: '60px' }}>
        <DetailedCardView id={id} />
      </div>
    </div>
  )
}

export default CardDetails
