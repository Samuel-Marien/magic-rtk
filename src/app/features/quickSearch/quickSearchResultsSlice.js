import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  cards: [],
  totalCards: 0,
  error: ''
}

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (userSearch) => {
    const response = await axios.get(
      `https://api.scryfall.com/cards/search?order=cmc&q=${userSearch}}`
    )
    return response.data
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state, action) => {
      state.isLoading = true
      state.totalCards = 0
    })
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false
      state.cards = action.payload
      state.totalCards = action.payload.data.length
      state.error = ''
    })
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false
      state.cards = []
      state.totalCards = 0
      state.error = action.payload
    })
  }
})

export default cardsSlice.reducer
