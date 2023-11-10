import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Image, Segment, Dropdown, Radio } from 'semantic-ui-react'

import { orderOptions } from './utils/dropdownOptions'
import { fetchAdvancedCards } from './advancedCardsSearchSlice'

import Loaders from '../../../components/Loaders'

const AdvancedResult = (props) => {
  const { form } = props

  const search = useSelector((state) => state.advancedCards.searchParams)
  const { isLoading, isSuccess, cards, totalCards, error } = useSelector(
    (state) => state.advancedCards
  )
  console.log(error)
  // console.log(search)
  // console.log(form.getState().values)

  const [cardStyles, setCardStyles] = useState({})
  const [flippedCards, setFlippedCards] = useState([])
  const [imageSources, setImageSources] = useState({})
  const [dropdownValue, setDropdownValue] = useState(search.order)
  const [dirValue, setDirValue] = useState(search.dir)

  const dispatch = useDispatch()

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
    <Segment>
      <Segment style={{ display: 'flex', alignItems: 'center' }}>
        <label>Order</label>
        <Dropdown
          name="order"
          value={dropdownValue}
          selection
          options={orderOptions}
          onChange={(e, { value }) => {
            dispatch(
              fetchAdvancedCards({ ...search, dir: dirValue, order: value })
            )
            form.change('order', value)
            setDropdownValue(value)
          }}
        />
        <div>
          <Radio
            toggle
            checked={form.getState().values.dir === 'desc' ? true : false}
            onChange={(e, { checked }) => {
              const dir = checked ? 'desc' : 'asc'
              dispatch(
                fetchAdvancedCards({ ...search, order: dropdownValue, dir })
              )
              form.change('dir', dir)
              setDirValue(dir)
            }}
          />
        </div>
      </Segment>
      {isLoading && <Loaders />}
      {error && <p>{error}</p>}
      <Card.Group
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {/* View for non-flipped Cards */}
        {isSuccess &&
          cards
            .filter((card) => card.card_faces === undefined)
            .map((card) => {
              return (
                <Card
                  key={card.id}
                  href={`/card-details/${card.id}`}
                  style={{
                    width: '14rem',
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
    </Segment>
  )
}

export default AdvancedResult
