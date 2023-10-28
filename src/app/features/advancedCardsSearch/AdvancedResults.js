import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'

import Loaders from '../../../components/Loaders'

const AdvancedResult = () => {
  // const cards = useSelector((state) => state.advancedCards.cards)
  // const error = useSelector((state) => state.advancedCards.error)
  const { isLoading, cards, totalCards, error } = useSelector(
    (state) => state.advancedCards
  )
  console.log(error)

  const [cardStyles, setCardStyles] = useState({})
  const [flippedCards, setFlippedCards] = useState([])
  const [imageSources, setImageSources] = useState({})

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
    <div>
      {isLoading && <Loaders />}
      {error && <p>{error}</p>}
      <Card.Group
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {/* View for non-flipped Cards */}
        {cards &&
          cards
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
      </Card.Group>
    </div>
  )
}

export default AdvancedResult
