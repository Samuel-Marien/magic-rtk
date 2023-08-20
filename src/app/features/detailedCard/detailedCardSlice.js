import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  card: {},
  error: ''
}

export const fetchCard = createAsyncThunk('card/fetchCard', async (id) => {
  const response = await axios.get(`https://api.scryfall.com/cards/${id}`)
  return response.data
})

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.isLoading = false
      state.card = action.payload
      state.error = ''
    })
    builder.addCase(fetchCard.rejected, (state, action) => {
      state.isLoading = false
      state.card = {}
      state.error = action.payload
    })
  }
})

export default cardSlice.reducer
