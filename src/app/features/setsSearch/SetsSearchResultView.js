import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Card, Image, Icon, Container } from 'semantic-ui-react'

import { fetchAllSets } from './setsSearchResultSlice'

import Loaders from '../../../components/Loaders'

const SetsSearchResultView = () => {
  const sets = useSelector((state) => state.sets)
  const { setUserSearch } = useSelector((state) => state.setSetsUserSearch)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllSets())
  }, [dispatch])

  // console.log(sets)
  // console.log(setUserSearch)

  return (
    <div>
      {sets.isLoading && <Loaders />}
      {sets.error && <p>{sets.error}</p>}
      <Card.Group
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {sets.sets.data &&
          setUserSearch &&
          sets.sets.data
            .filter((set) => setUserSearch.includes(set.name))
            .map((set) => {
              return (
                <Card key={set.id} href={`/set-details/${set.code}`}>
                  <Card.Content>
                    <Image
                      floated="right"
                      size="mini"
                      src={
                        set.name !== 'Ravnica Remastered' &&
                        set.name !== 'Wilds of Eldraine: Enchanting Tales'
                          ? set.icon_svg_uri
                          : `/images/pngegg.png`
                      }
                    />
                    <Card.Header>{set.name}</Card.Header>
                    <Card.Meta>
                      <Icon name="calendar" color="grey" />
                      <span>{set.released_at}</span>
                    </Card.Meta>
                    <Card.Meta>
                      <Icon name="id badge" color="grey" />
                      <span>{set.card_count}</span>
                      <span>({set.set_type})</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              )
            })}
      </Card.Group>
    </div>
  )
}

export default SetsSearchResultView
