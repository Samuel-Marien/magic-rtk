import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Navbar from '../components/Navbar'

const SetSearch = () => {
  const cards = useSelector((state) => state.cards)
  console.log(cards)
  return (
    <div>
      <Navbar />
      SetSearch
    </div>
  )
}

export default SetSearch
