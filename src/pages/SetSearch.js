import React from 'react'
import { useSelector } from 'react-redux'

import Navbar from '../components/Navbar'
import SetsSearchView from '../app/features/setsSearch/SetsSearchView'
import SetsSearchResultView from '../app/features/setsSearch/SetsSearchResultView'

const SetSearch = () => {
  // const cards = useSelector((state) => state.cards)
  // console.log(cards)
  return (
    <div
      style={{
        height: '800px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, 
        rgba(255, 255, 255, 1) 100%), 
        url('../images/bg10.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <SetsSearchView />
      <SetsSearchResultView />
    </div>
  )
}

export default SetSearch
