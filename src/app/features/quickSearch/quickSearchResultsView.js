import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCards } from './quickSearchResultsSlice'

import { Card, Image, Container } from 'semantic-ui-react'

const QuickSearchResultsView = () => {
  const { userSearch } = useSelector((state) => state.quickSearch)
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userSearch === '') return
    dispatch(fetchCards(userSearch))
  }, [dispatch, userSearch])

  // console.log(cards)

  return (
    <Container>
      {cards.isLoading && <p>Loading...</p>}
      {cards.error && <p>{cards.error}</p>}
      <Card.Group style={{ display: 'flex', justifyContent: 'center' }}>
        {cards.cards.data &&
          cards.cards.data.map((card) => {
            return (
              <Card key={card.id} href={`/card-details/${card.id}`}>
                {card.card_faces && (
                  <Image
                    src={card.card_faces[0].image_uris.art_crop}
                    wrapped
                    ui={false}
                  />
                )}
                {card.image_uris && (
                  <Image src={card.image_uris.art_crop} wrapped ui={false} />
                )}

                <Card.Content>
                  <Card.Header>{card.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">{card.released_at}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            )
          })}
      </Card.Group>
    </Container>
  )
}

export default QuickSearchResultsView
