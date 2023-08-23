import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserSearch } from './quickSearchSlice'

import { Input, Button, Container, Header } from 'semantic-ui-react'

const QuickSearchView = () => {
  const [userInput, setUserInput] = useState('')

  const { userSearch } = useSelector((state) => state.quickSearch)
  const { totalCards } = useSelector((state) => state.cards)
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  // console.log(cards)
  // console.log(totalCards)
  // console.log('userInput', userInput)
  // console.log('userSearch', userSearch)

  return (
    <Container textAlign="center">
      <Header as="h1" style={{ margin: '50px 0 0 0', color: 'white' }}>
        Do a quick search by name's card for quick first results.
      </Header>
      <Header
        as="h4"
        style={{
          margin: '5px 0 30px 0 ',
          color: 'white',
          fontStyle: 'italic',
          fontWeight: 'normal'
        }}
      >
        Or go to the cards section to add more options to your search.
      </Header>
      <Input
        action
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="ex: thal, nezu, elesh etc..."
      >
        <input />
        <Button
          color="teal"
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
