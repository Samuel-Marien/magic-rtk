import React from 'react'
import { useParams } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import Navbar from '../components/Navbar'
import DetailedSetView from '../app/features/detailedSet/DetailedSetView'

const SetDetails = () => {
  let { code } = useParams()
  return (
    <div
      style={{
        height: '1200px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url('../images/bg15.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <Container fluid style={{ padding: '0 5% 0 5%' }}>
        <DetailedSetView code={code} />
      </Container>
    </div>
  )
}

export default SetDetails
