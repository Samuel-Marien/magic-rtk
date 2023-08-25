import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Card,
  Image,
  Icon,
  Button,
  Header,
  Checkbox,
  Segment,
  Dropdown
} from 'semantic-ui-react'

import { fetchCards, fetchCardsSetInfos } from './detailedSetSlice'

import Loaders from '../../../components/Loaders'

const DetailedSetView = (props) => {
  const { code } = props

  const { cards } = useSelector((state) => state.cardsSet)
  const setName = useSelector((state) => state.cardsSet.setName)
  const setInfos = useSelector((state) => state.cardsSet.setInfos)
  const totalCards = useSelector((state) => state.cardsSet.totalCards)
  const dispatch = useDispatch()

  const [cardStyles, setCardStyles] = useState({})
  const [flippedCards, setFlippedCards] = useState([])
  const [imageSources, setImageSources] = useState({})
  const [order, setOrder] = useState('')
  const [dir, setDir] = useState(false)

  useEffect(() => {
    dispatch(fetchCards({ code, order, dir }))
    dispatch(fetchCardsSetInfos(code))
  }, [dispatch, code, order, dir])

  // console.log(cards)
  // console.log(setInfos)
  // console.log(setName)
  // console.log(totalCards)
  // console.log(dir)
  // console.log(order)

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

  const options = [
    { key: 0, text: 'Not sorted', value: '' },
    { key: 1, text: 'Name', value: 'name' },
    { key: 2, text: 'Set', value: 'set' },
    { key: 3, text: 'Released', value: 'released' },
    { key: 4, text: 'Rarity', value: 'rarity' },
    { key: 5, text: 'Color', value: 'color' },
    { key: 6, text: 'U.S. Dollar price', value: 'usd' },
    { key: 7, text: 'TIX price', value: 'tix' },
    { key: 8, text: 'Euro price', value: 'eur' },
    { key: 9, text: 'Mana value', value: 'cmc' },
    { key: 10, text: 'Power', value: 'power' },
    { key: 11, text: 'Toughness', value: 'toughness' },
    { key: 12, text: 'EDHREC ranking', value: 'edhrec' },
    { key: 13, text: 'Penny Dreadful ranking', value: 'penny' },
    { key: 14, text: 'Artist', value: 'artist' },
    { key: 15, text: 'Review', value: 'review' }
  ]

  const handleDropDownClick = (event, value) => {
    event.preventDefault()
    setOrder(value)
    // console.log(value)
  }

  return (
    <>
      <Segment
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: 'none',
          border: 'none',
          height: '8rem',
          borderRadius: '0'
        }}
        color="black"
      >
        <Button.Group>
          <Button
            style={{ marginRight: '1rem' }}
            icon="id badge"
            label={{ content: totalCards }}
            labelPosition="left"
            size="mini"
            color="teal"
          />
          <Button
            style={{ marginRight: '1rem' }}
            icon="calendar"
            label={{ content: setInfos.released_at }}
            labelPosition="left"
            size="mini"
            color="teal"
          />
        </Button.Group>
        <Header
          as="h1"
          color="teal"
          style={{
            display: 'flex',
            // alignItems: 'center',
            fontWeight: 'bolder',
            marginTop: '0.5rem',
            marginBottom: '0.5rem'
          }}
        >
          {setName}
          <span
            style={{
              fontSize: '0.7em',
              marginLeft: '.3em',
              fontWeight: 'thin',
              paddingTop: '.1em'
            }}
          >
            ({setInfos.set_type})
          </span>
        </Header>

        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Checkbox
            // style={{ marginRight: '1rem' }}
            slider
            onClick={() => setDir(!dir)}
          />
          <p
            style={{
              margin: '0 1rem 0 .5rem',
              color: 'white',
              // fontWeight: 'thin',
              fontSize: '1.2rem'
            }}
          >
            {dir ? 'Desc' : 'Asc'}
          </p>
          <Dropdown
            options={options}
            selection
            placeholder="Sort by..."
            onChange={(e, { value }) => handleDropDownClick(e, value)}
          />
        </div>
      </Segment>
      {cards.isLoading && <Loaders />}
      {cards.error && <p>{cards.error}</p>}
      <Card.Group
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}
      >
        {/* View for non-flipped Cards */}
        {cards.data &&
          cards.data
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
        {cards.data &&
          cards.data
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
        {cards.data &&
          cards.data
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
    </>
  )
}

export default DetailedSetView
