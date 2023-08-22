import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  setUserSearch: ''
}

const setsSearchSlice = createSlice({
  name: 'setsSearch',
  initialState,
  reducers: {
    setSetsUserSearch(state, action) {
      state.setUserSearch = action.payload
    }
  }
})

export default setsSearchSlice.reducer
export const { setSetsUserSearch } = setsSearchSlice.actions
