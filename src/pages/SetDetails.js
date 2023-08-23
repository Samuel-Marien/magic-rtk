import React from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import DetailedSetView from '../app/features/detailedSet/DetailedSetView'

const SetDetails = () => {
  let { code } = useParams()
  return (
    <div
      style={{
        height: '800px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url('../images/bg13.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <DetailedSetView code={code} />
    </div>
  )
}

export default SetDetails
