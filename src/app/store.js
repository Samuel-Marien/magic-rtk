import { configureStore } from '@reduxjs/toolkit'
import quickSearchReducer from './features/quickSearch/quickSearchSlice'
import cardsReducer from './features/quickSearch/quickSearchResultsSlice'
const store = configureStore({
  reducer: {
    quickSearch: quickSearchReducer,
    cards: cardsReducer
  }
})

export default store
