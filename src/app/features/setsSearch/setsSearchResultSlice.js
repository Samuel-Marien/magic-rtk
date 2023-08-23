import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  sets: [],
  totalSets: 0,
  allSetsNames: [],
  error: ''
}

export const fetchAllSets = createAsyncThunk('sets/fetchSets', async () => {
  const response = await axios.get(`https://api.scryfall.com/sets`)

  return response.data
})

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSets.pending, (state, action) => {
      state.isLoading = true
      state.totalSets = 0
    })
    builder.addCase(fetchAllSets.fulfilled, (state, action) => {
      state.isLoading = false
      state.sets = action.payload
      state.totalSets = action.payload.data.length
      state.allSetsNames = action.payload.data.map((set) => set.name)
      state.error = ''
    })
    builder.addCase(fetchAllSets.rejected, (state, action) => {
      state.isLoading = false
      state.sets = []
      state.totalSets = 0
      state.error = action.payload
    })
  }
})

export default setsSlice.reducer
