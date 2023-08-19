import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCards } from './quickSearchResultsSlice'

import { Card, Image, Container, Icon, Button } from 'semantic-ui-react'

const QuickSearchResultsView = () => {
  const { userSearch } = useSelector((state) => state.quickSearch)
  const [cardStyles, setCardStyles] = useState({})
  const [flippedCards, setFlippedCards] = useState([])
  const [imageSources, setImageSources] = useState({})

  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userSearch === '') return
    dispatch(fetchCards(userSearch))
  }, [dispatch, userSearch])

  // console.log(cards)

  const rarityToBorder = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'grey'
      case 'uncommon':
        return 'LightBlue '
      case 'rare':
        return 'gold'
      case 'mythic':
        return 'orange'
      default:
        return 'black'
    }
  }

  const handleFlipClick = (event, cardId) => {
    event.preventDefault()
    // Clonez l'objet d'état actuel
    const updatedStyles = { ...cardStyles }
    const updatedFlippedCards = [...flippedCards]

    // Vérifiez si la carte est déjà "flipped"
    const isFlipped = updatedFlippedCards.includes(cardId)

    if (isFlipped) {
      // Si la carte est "flipped", réinitialisez son style
      delete updatedStyles[cardId]
      const index = updatedFlippedCards.indexOf(cardId)
      updatedFlippedCards.splice(index, 1)
    } else {
      // Sinon, changez le style de la carte
      updatedStyles[cardId] = {
        border: `3px solid ${rarityToBorder(
          cards.cards.data.find((card) => card.id === cardId).rarity
        )}`,
        borderRadius: '10px',
        height: '90%',
        transform: 'rotate(180deg)'
      }
      updatedFlippedCards.push(cardId)
    }

    // Mettez à jour l'état local avec les nouveaux styles et cartes "flipped"
    setCardStyles(updatedStyles)
    setFlippedCards(updatedFlippedCards)
  }

  const handleFlipClick2 = (event, cardId) => {
    event.preventDefault()
    // Clonez l'objet d'état actuel
    const updatedSources = { ...imageSources }

    // Vérifiez si la source de l'image est déjà changée
    const isFlipped = updatedSources[cardId] === 'src2'

    // Changez la source de l'image en fonction de l'état actuel
    updatedSources[cardId] = isFlipped ? 'src' : 'src2'

    // Mettez à jour l'état local avec la nouvelle source
    setImageSources(updatedSources)
  }

  return (
    <Container>
      {cards.isLoading && <p>Loading...</p>}
      {cards.error && <p>{cards.error}</p>}
      <Card.Group
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {/* View for non-flipped Cards */}
        {cards.cards.data &&
          cards.cards.data
            .filter((card) => card.card_faces === undefined)
            .map((card) => {
              return (
                <Card
                  key={card.id}
                  href={`/card-details/${card.id}`}
                  style={{
                    border: `3px solid ${rarityToBorder(card.rarity)}`,
                    borderRadius: '10px',
                    height: '90%'
                  }}
                >
                  {card.image_uris && (
                    <Image
                      src={card.image_uris.border_crop}
                      wrapped
                      ui={false}
                      alt={card.name}
                    />
                  )}
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
                <Card
                  key={card.id}
                  href={`/card-details/${card.id}`}
                  style={cardStyles[card.id] || {}}
                >
                  {card.image_uris && (
                    <Image
                      src={card.image_uris.border_crop}
                      wrapped
                      ui={false}
                      alt={card.name}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute'
                    }}
                  >
                    <Button
                      circular
                      style={{
                        margin: '3px 0 0 3px',
                        padding: ' 8px ',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: `1px solid ${rarityToBorder(card.rarity)}`
                      }}
                      icon
                      onClick={(e) => handleFlipClick(e, card.id)}
                    >
                      <Icon name="redo" size="small" />
                    </Button>
                  </div>
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
                <Card
                  key={card.id}
                  href={`/card-details/${card.id}`}
                  style={{
                    border: `3px solid ${rarityToBorder(card.rarity)}`,
                    borderRadius: '10px',
                    height: '90%'
                  }}
                >
                  {card.card_faces && (
                    <Image
                      src={
                        imageSources[card.id] === 'src2'
                          ? card.card_faces[1].image_uris.border_crop
                          : card.card_faces[0].image_uris.border_crop
                      }
                      wrapped
                      ui={false}
                      alt={card.name}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute'
                    }}
                  >
                    <Button
                      circular
                      style={{
                        margin: '3px 0 0 3px',
                        padding: ' 8px ',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: `1px solid ${rarityToBorder(card.rarity)}`
                      }}
                      icon
                      onClick={(e) => handleFlipClick2(e, card.id)}
                    >
                      <Icon name="redo" size="small" />
                    </Button>
                  </div>
                </Card>
              )
            })}
      </Card.Group>
    </Container>
  )
}

export default QuickSearchResultsView
