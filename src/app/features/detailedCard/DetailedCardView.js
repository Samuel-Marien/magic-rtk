import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Container } from 'semantic-ui-react'

import { fetchCard, fetchRulings } from './detailedCardSlice'

import MyCard from './MyCard'
import Rulings from './Rulings'
import Loaders from '../../../components/Loaders'

const DetailedCardView = (props) => {
  const { id } = props
  const [flipCard, setFlipCard] = useState(true)

  const { card } = useSelector((state) => state.card)
  const rulings = useSelector((state) => state.card.rulings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCard(id))
    dispatch(fetchRulings(id))
  }, [dispatch, id])

  console.log(card)
  console.log(card.layout)
  console.log(flipCard)

  return (
    <Container>
      {card.isLoading && <Loaders />}
      {card.error && <p>{card.error}</p>}

      <MyCard
        onClick={() => setFlipCard(!flipCard)}
        imgSrc={
          card.layout === 'normal'
            ? card.image_uris.large
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].image_uris.large
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].image_uris.large
            : null
        }
        name={
          card.layout === 'normal'
            ? card.name
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].name
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].name
            : null
        }
        typeLine={
          card.layout === 'normal'
            ? card.type_line
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].type_line
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].type_line
            : null
        }
        power={
          card.layout === 'normal'
            ? card.power
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].power
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].power
            : null
        }
        toughness={
          card.layout === 'normal'
            ? card.toughness
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].toughness
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].toughness
            : null
        }
        manaCost={
          card.layout === 'normal'
            ? card.manaCost
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].mana_cost
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].mana_cost
            : null
        }
        oracleText={
          card.layout === 'normal'
            ? card.oracle_text
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].oracle_text
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].oracle_text
            : null
        }
        artist={
          card.layout === 'normal'
            ? card.artist
            : card.layout === 'transform' && flipCard
            ? card.card_faces[0].artist
            : card.layout === 'transform' && !flipCard
            ? card.card_faces[1].artist
            : null
        }
        rarity={card.rarity}
        collectorNumber={card.collector_number}
        isDigital={card.digital}
        flavorText={card.flavor_text}
        foil={card.foil}
        games={card.games}
        keywords={card.keywords}
        mtgoId={card.mtgo_id}
        multiverseIds={card.multiverse_ids}
        nonfoil={card.nonfoil}
        frame={card.frame}
        frameEffects={card.frame_effects}
        arenaId={card.arena_id}
        booster={card.booster}
        edhrecRank={card.edhrec_rank}
        fullArt={card.full_art}
        layout={card.layout}
        legalities={card.legalities}
        pennyRank={card.penny_rank}
        prices={card.prices}
        promo={card.promo}
        purchaseUris={card.purchase_uris}
        relatedUris={card.related_uris}
        releasedAt={card.released_at}
        reserved={card.reserved}
        reprint={card.reprint}
        setName={card.set_name}
        set={card.set}
        setSearchUri={card.set_search_uri}
        variation={card.variation}
        setType={card.set_type}
      >
        <Rulings rulings={rulings} />
      </MyCard>
    </Container>
  )
}

export default DetailedCardView
