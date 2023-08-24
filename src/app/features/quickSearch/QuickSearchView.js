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
    <>
      <Header
        as="h1"
        style={{
          margin: '50px 0 0 0',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        Do a quick search by name's card for quick first results.
      </Header>
      <Header
        as="h4"
        style={{
          margin: '5px 0 15px 0 ',
          color: 'white',
          fontStyle: 'italic',
          fontWeight: 'normal',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        Or go to the cards section to add more options to your search.
      </Header>
      <div
        style={{
          margin: '5px 0 15px 0 ',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ marginRight: '1rem' }}>
          <Input
            size="mini"
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
        </div>

        {totalCards > 0 && (
          <Header
            as="h4"
            style={{
              margin: '0',
              color: 'teal',
              padding: '5px 10px 5px 10px',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          >
            <span style={{}}>
              Matchs with {totalCards} results found with{' '}
              <span
                style={{
                  textTransform: 'uppercase'
                }}
              >
                {userSearch}{' '}
              </span>
              as search
            </span>
          </Header>
        )}
      </div>
    </>
  )
}

export default QuickSearchView
