import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSetsUserSearch } from './setsSearchSlice'
import { Input, Button, Container, Header } from 'semantic-ui-react'

const SetsSearchView = () => {
  const [userInput, setUserInput] = useState('')

  const { setUserSearch } = useSelector((state) => state.setSetsUserSearch)
  const dispatch = useDispatch()

  console.log(setUserSearch)

  return (
    <Container textAlign="center">
      <Header as="h1" style={{ margin: '50px 0 0 0', color: 'white' }}>
        Search by name's set.
      </Header>
      <Input
        style={{
          margin: '20px 0 10px 0 '
        }}
        action
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="type a set name..."
      >
        <input />
        <Button
          color="teal"
          type="submit"
          onClick={() => dispatch(setSetsUserSearch(userInput))}
        >
          Search
        </Button>
      </Input>
    </Container>
  )
}

export default SetsSearchView
