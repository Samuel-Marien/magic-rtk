import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userSearch: ''
}

const quickSearchSlice = createSlice({
  name: 'quickSearch',
  initialState,
  reducers: {
    setUserSearch(state, action) {
      state.userSearch = action.payload
    }
  }
})

export default quickSearchSlice.reducer
export const { setUserSearch } = quickSearchSlice.actions
