import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  cards: [],
  totalCards: 0,
  error: null,
  searchParams: {
    cardName: '',
    color: '*',
    variations: false,
    includeExtras: false,
    rarity: '*',
    order: 'released',
    dir: 'desc',
    unique: 'arts',
    power: {
      powerValue: 0,
      isActive: false
    },
    toughness: {
      toughnessValue: 0,
      isActive: false
    }
  }
}
const url = 'https://api.scryfall.com/cards/search'

export const fetchAdvancedCards = createAsyncThunk(
  'advancedCards/fetchAdvancedCards',
  async (datas, { rejectWithValue }) => {
    const {
      cardName,
      color,
      variations,
      includeExtras,
      rarity,
      order,
      dir,
      unique
    } = datas
    // console.log(datas)
    try {
      const response = await axios.get(
        `${url}?order=${order}&include_variations=${variations}&include_extras=${includeExtras}&unique=${unique}&dir=${dir}&q=${
          cardName === '' ? '*' : cardName
        }${color !== '*' ? `+c%3A${color}` : `+c%3A*`}${
          rarity && `+rarity%3A${rarity}`
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
      state.isSuccess = true
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
