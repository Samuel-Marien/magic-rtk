import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserSearch } from './quickSearchSlice'

import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const QuickSearchView = () => {
  const [userInput, setUserInput] = useState('')

  const { userSearch } = useSelector((state) => state.quickSearch)
  const { totalCards } = useSelector((state) => state.cards)
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  console.log(cards)
  // console.log(totalCards)
  // console.log('userInput', userInput)
  // console.log('userSearch', userSearch)

  return (
    <Container textAlign="center">
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
      {totalCards > 0 && (
        <Header as="h4" style={{ margin: '10px 0 10px 0' }}>
          Your search:{' '}
          <span style={{ textTransform: 'capitalize', color: 'grey' }}>
            {userSearch}
          </span>{' '}
          - Matchs: <span style={{ color: 'grey' }}>{totalCards}</span> Cards
        </Header>
      )}
    </Container>
  )
}

export default QuickSearchView
