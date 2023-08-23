import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSetsUserSearch } from './setsSearchSlice'
import { Input, Container, Header } from 'semantic-ui-react'

const SetsSearchView = () => {
  const [userInput, setUserInput] = useState('')

  const allSetsNames = useSelector((state) => state.sets.allSetsNames)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fonction de filtrage des noms de sets
    const filterSets = () => {
      const searchTerm = userInput.toLowerCase().trim()
      if (searchTerm) {
        return allSetsNames.filter((setName) =>
          setName.toLowerCase().includes(searchTerm)
        )
      } else {
        return allSetsNames
      }
    }
    dispatch(setSetsUserSearch(filterSets()))
  }, [userInput, allSetsNames])

  // console.log(userInput)
  // console.log(allSetsNames)

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
        placeholder="type a set name"
      >
        <input />
      </Input>
    </Container>
  )
}

export default SetsSearchView
