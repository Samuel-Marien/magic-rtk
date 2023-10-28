import { configureStore } from '@reduxjs/toolkit'
import quickSearchReducer from './features/quickSearch/quickSearchSlice'
import cardsReducer from './features/quickSearch/quickSearchResultsSlice'
import cardReducer from './features/detailedCard/detailedCardSlice'
import setSearchReducer from './features/setsSearch/setsSearchSlice'
import setsReducer from './features/setsSearch/setsSearchResultSlice'
import detailedSetReducer from './features/detailedSet/detailedSetSlice'
import advancedCardsReducer from './features/advancedCardsSearch/advancedCardsSearchSlice'

const store = configureStore({
  reducer: {
    quickSearch: quickSearchReducer,
    cards: cardsReducer,
    card: cardReducer,
    setSetsUserSearch: setSearchReducer,
    sets: setsReducer,
    cardsSet: detailedSetReducer,
    advancedCards: advancedCardsReducer
  }
})

export default store
