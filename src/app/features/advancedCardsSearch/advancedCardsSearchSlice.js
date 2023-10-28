import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  cards: [],
  totalCards: 0,
  error: null,
  searchParams: {
    cardName: '*',
    color: '*',
    variations: false,
    includeExtras: false,
    rarity: 'uncommon'
  }
}
const url = 'https://api.scryfall.com/cards/search'

export const fetchAdvancedCards = createAsyncThunk(
  'advancedCards/fetchAdvancedCards',
  async (datas, { rejectWithValue }) => {
    // console.log(datas)
    try {
      const response = await axios.get(
        `${url}?order=cmc&include_variations=${
          datas.variations
        }&include_extras=${datas.includeExtras}&unique=prints&dir=asc&q=${
          datas.cardName
        }${datas.color !== '*' ? `+c%3A${datas.color}` : `+c%3A*`}${
          datas.rarity && `+rarity%3A${datas.rarity}`
        }`
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const advancedCardsSlice = createSlice({
  name: 'advancedCards',
  initialState,
  reducers: {
    setAdvancedSearchParams(state, action) {
      state.searchParams = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdvancedCards.pending, (state, action) => {
      state.isLoading = true
      state.totalCards = 0
    })
    builder.addCase(fetchAdvancedCards.fulfilled, (state, action) => {
      state.isLoading = false
      state.cards = action.payload.data
      state.totalCards = action.payload.total_cards
      state.error = ''
    })
    builder.addCase(fetchAdvancedCards.rejected, (state, action) => {
      state.isLoading = false
      state.cards = []
      state.totalCards = 0
      state.error = action.payload.details
    })
  }
})

export const { setAdvancedSearchParams } = advancedCardsSlice.actions

export default advancedCardsSlice.reducer
