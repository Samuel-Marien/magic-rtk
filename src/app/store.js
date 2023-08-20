import { configureStore } from '@reduxjs/toolkit'
import quickSearchReducer from './features/quickSearch/quickSearchSlice'
import cardsReducer from './features/quickSearch/quickSearchResultsSlice'
import cardReducer from './features/detailedCard/detailedCardSlice'

const store = configureStore({
  reducer: {
    quickSearch: quickSearchReducer,
    cards: cardsReducer,
    card: cardReducer
  }
})

export default store
