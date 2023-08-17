import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserSearch } from './quickSearchSlice'

import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

const QuickSearchView = () => {
  const [userInput, setUserInput] = useState('')

  const { userSearch } = useSelector((state) => state.quickSearch)
  const dispatch = useDispatch()

  console.log('userInput', userInput)
  console.log('userSearch', userSearch)

  return (
    <>
      <Input
        action
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Search for card..."
      >
        <input />
        <Button
          type="submit"
          onClick={() => dispatch(setUserSearch(userInput))}
        >
          Search
        </Button>
      </Input>

      <p>Your search: {userSearch}</p>
    </>
  )
}

export default QuickSearchView
