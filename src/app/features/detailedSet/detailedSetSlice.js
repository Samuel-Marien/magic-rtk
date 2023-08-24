import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  cards: [],
  setName: '',
  error: ''
}

export const fetchCards = createAsyncThunk('card/fetchCards', async (code) => {
  const response = await axios.get(
    `https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=rarity&dir=desc&q=e%3A${code}&unique=prints`
  )
  // console.log(response.data)
  return response.data
})

const cardsSetSlice = createSlice({
  name: 'cardsSet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false
      state.cards = action.payload
      state.setName = action.payload.data[0].set_name
      state.error = ''
    })
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false
      state.cards = []
      state.error = action.payload
    })
  }
})

export default cardsSetSlice.reducer
