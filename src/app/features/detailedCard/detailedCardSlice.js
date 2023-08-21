import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  card: {},
  rulings: [],
  error: ''
}

export const fetchCard = createAsyncThunk('card/fetchCard', async (id) => {
  const response = await axios.get(`https://api.scryfall.com/cards/${id}`)
  return response.data
})

export const fetchRulings = createAsyncThunk(
  'card/fetchRulings',
  async (id) => {
    const response = await axios.get(
      `https://api.scryfall.com/cards/${id}/rulings`
    )
    return response.data
  }
)

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.pending, (state) => {
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
    // rulings
    builder.addCase(fetchRulings.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchRulings.fulfilled, (state, action) => {
      state.isLoading = false
      state.rulings = action.payload
    })
    builder.addCase(fetchRulings.rejected, (state, action) => {
      state.isLoading = false
      state.rulings = []
      state.error = action.payload
    })
  }
})
// console.log(initialState)
export default cardSlice.reducer
