import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSetsUserSearch } from './setsSearchSlice'
import { Input, Header, Container } from 'semantic-ui-react'

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
    <div
      style={{
        display: 'flex',
        marginTop: '4rem',
        marginBottom: '2rem'
      }}
    >
      <Header as="h1" style={{ color: 'white', marginRight: '2rem' }}>
        All Sets
      </Header>
      <div>
        <Input
          icon="search"
          size="mini"
          action
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="type a set name"
        />
      </div>
    </div>
  )
}

export default SetsSearchView
