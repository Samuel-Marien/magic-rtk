import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  cards: [],
  setName: '',
  setInfos: {},
  totalCards: 0,

  error: ''
}

export const fetchCards = createAsyncThunk(
  'card/fetchCards',
  async ({ code, order, dir }) => {
    // console.log(code)
    // console.log(order)
    // console.log(dir)

    const response = await axios.get(
      `https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=${order}&dir=${
        dir ? 'asc' : 'desc'
      }&q=e%3A${code}&unique=prints`
    )
    // console.log(response.data)
    return response.data
  }
)

export const fetchCardsSetInfos = createAsyncThunk(
  'cardsSet/fetchCardsSetInfos',
  async (code) => {
    const response = await axios.get(`https://api.scryfall.com/sets/${code}`)
    return response.data
  }
)

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
      state.totalCards = action.payload.total_cards
      state.error = ''
    })
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false
      state.cards = []
      state.error = action.payload
    })
    // About Set
    builder.addCase(fetchCardsSetInfos.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCardsSetInfos.fulfilled, (state, action) => {
      state.isLoading = false
      state.setInfos = action.payload
    })
    builder.addCase(fetchCardsSetInfos.rejected, (state, action) => {
      state.isLoading = false
      state.setInfos = {}
      state.error = action.payload
    })
  }
})

export default cardsSetSlice.reducer
