import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Navbar from '../components/Navbar'

const CardSearch = () => {
  const cards = useSelector((state) => state.cards)
  console.log(cards)
  return (
    <div>
      <Navbar />
      CardSearch
    </div>
  )
}

export default CardSearch
