import { configureStore } from '@reduxjs/toolkit'
import quickSearchReducer from './features/quickSearch/quickSearchSlice'

const store = configureStore({
  reducer: {
    quickSearch: quickSearchReducer
  }
})

export default store
