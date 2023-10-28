import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'

import { Container } from 'semantic-ui-react'

import Navbar from '../components/Navbar'
import AdvancedCardsSearchView from '../app/features/advancedCardsSearch/AdvancedCardsSearchView'

const CardSearch = () => {
  // const cards = useSelector((state) => state.cards)
  // console.log(cards)
  return (
    <div
      style={{
        height: '800px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url('../images/bg4.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <Container fluid style={{ padding: '0 5% 0 5%' }}>
        <AdvancedCardsSearchView />
      </Container>
    </div>
  )
}

export default CardSearch
