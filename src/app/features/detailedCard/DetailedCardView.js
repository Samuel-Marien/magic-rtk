import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Container } from 'semantic-ui-react'

import { fetchCard, fetchRulings } from './detailedCardSlice'

import MyCard from './MyCard'
import Rulings from './Rulings'

const DetailedCardView = (props) => {
  const { id } = props

  const { card } = useSelector((state) => state.card)
  const rulings = useSelector((state) => state.card.rulings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCard(id))
    dispatch(fetchRulings(id))
  }, [dispatch, id])

  console.log(card)
  // console.log(rulings)

  return (
    <Container>
      {card.isLoading && <p>Loading...</p>}
      {card.error && <p>{card.error}</p>}
      <MyCard
        imgSrc={
          card.image_uris
            ? card.image_uris.large
            : card.card_faces
            ? card.card_faces[0].image_uris.large
            : null
        }
        name={card.name}
        rarity={card.rarity}
        artist={card.artist}
        collectorNumber={card.collector_number}
        isDigital={card.digital}
        flavorText={card.flavor_text}
        foil={card.foil}
        games={card.games}
        keywords={card.keywords}
        manaCost={card.mana_cost}
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
        oracleText={card.oracle_text}
        pennyRank={card.penny_rank}
        prices={card.prices}
        power={card.power}
        toughness={card.toughness}
        promo={card.promo}
        purchaseUris={card.purchase_uris}
        relatedUris={card.related_uris}
        releasedAt={card.released_at}
        reserved={card.reserved}
        reprint={card.reprint}
        setName={card.set_name}
        set={card.set}
        setSearchUri={card.set_search_uri}
        typeLine={card.type_line}
        variation={card.variation}
        setType={card.set_type}
      >
        <Rulings rulings={rulings} />
      </MyCard>
    </Container>
  )
}

export default DetailedCardView
