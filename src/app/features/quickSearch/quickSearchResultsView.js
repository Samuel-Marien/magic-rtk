import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCards } from './quickSearchResultsSlice'

import { Card, Image, Container, Icon, Button } from 'semantic-ui-react'

const CardContent = (props) => {
  const { releasedAt, artist, rarity, setName } = props
  return (
    <Card.Content style={{ border: 'none', padding: '5px' }}>
      {/* <Card.Header>{name}</Card.Header> */}
      <Card.Meta>
        <Icon name="calendar" color="grey" />
        <span>{releasedAt}</span>
      </Card.Meta>
      <Card.Meta>
        <Icon name="paint brush" color="grey" />
        <span>{artist}</span>
      </Card.Meta>
      <Card.Meta>
        <Icon name="fire" color="grey" />
        <span style={{ textTransform: 'capitalize' }}>{rarity}</span>
      </Card.Meta>
      <Card.Meta>
        <Icon name="box" color="grey" />
        <span>{setName}</span>
      </Card.Meta>
    </Card.Content>
  )
}

const QuickSearchResultsView = () => {
  const { userSearch } = useSelector((state) => state.quickSearch)
  const [showBack, setShowBack] = useState(false)
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userSearch === '') return
    dispatch(fetchCards(userSearch))
  }, [dispatch, userSearch])

  const handleShowBack = (e) => {
    e.preventDefault()
    setShowBack(!showBack)
  }
  // console.log(cards)
  console.log(showBack)

  return (
    <Container>
      {cards.isLoading && <p>Loading...</p>}
      {cards.error && <p>{cards.error}</p>}
      <Card.Group style={{ display: 'flex', justifyContent: 'center' }}>
        {/* View for non-flipped Cards */}
        {cards.cards.data &&
          cards.cards.data
            .filter((card) => card.card_faces === undefined)
            .map((card) => {
              return (
                <Card key={card.id}>
                  {card.image_uris && (
                    <Image
                      href={`/card-details/${card.id}`}
                      src={card.image_uris.border_crop}
                      wrapped
                      ui={false}
                      alt={card.name}
                    />
                  )}
                  <CardContent
                    name={card.name}
                    releasedAt={card.released_at}
                    artist={card.artist}
                    rarity={card.rarity}
                    setName={card.set_name}
                  />
                </Card>
              )
            })}

        {/* View for flipped Cards without double view*/}
        {cards.cards.data &&
          cards.cards.data
            .filter((card) => card.card_faces !== undefined)
            .filter((card) => card.card_faces[0].image_uris === undefined)
            .map((card) => {
              return (
                <Card key={card.id} href={`/card-details/${card.id}`}>
                  {card.image_uris && (
                    <Image
                      src={card.image_uris.border_crop}
                      wrapped
                      ui={false}
                      alt={card.name}
                    />
                  )}
                  <CardContent
                    name={card.name}
                    releasedAt={card.released_at}
                    artist={card.artist}
                    rarity={card.rarity}
                    setName={card.set_name}
                  />
                </Card>
              )
            })}

        {/* View for flipped Cards with double view */}
        {cards.cards.data &&
          cards.cards.data
            .filter((card) => card.card_faces !== undefined)
            .filter((card) => card.card_faces[0].image_uris !== undefined)
            .map((card) => {
              return (
                <Card key={card.id} href={`/card-details/${card.id}`}>
                  {card.card_faces && (
                    <Image
                      src={card.card_faces[0].image_uris.border_crop}
                      wrapped
                      ui={false}
                      alt={card.name}
                    />
                  )}
                  <div style={{ margin: '0 auto' }} onClick={handleShowBack}>
                    <Icon name="retweet" circular />
                  </div>
                  <CardContent
                    name={card.name}
                    releasedAt={card.released_at}
                    artist={card.artist}
                    rarity={card.rarity}
                    setName={card.set_name}
                  />
                </Card>
              )
            })}
      </Card.Group>
    </Container>
  )
}

export default QuickSearchResultsView
