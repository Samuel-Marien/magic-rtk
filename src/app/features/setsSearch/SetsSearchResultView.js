import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Card, Image, Container, Icon } from 'semantic-ui-react'

import { fetchAllSets } from './setsSearchResultSlice'

const SetsSearchResultView = () => {
  const sets = useSelector((state) => state.sets)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllSets())
  }, [dispatch])

  console.log(sets)

  return (
    <Container>
      {sets.isLoading && <p>Loading...</p>}
      {sets.error && <p>{sets.error}</p>}
      <Card.Group
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {sets.sets.data &&
          sets.sets.data.map((set) => {
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
    </Container>
  )
}

export default SetsSearchResultView
