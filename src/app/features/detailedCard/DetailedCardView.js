import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Image, Segment, Container } from 'semantic-ui-react'

import { fetchCard, fetchRulings } from './detailedCardSlice'

const MyCard = (props) => {
  const {
    imgSrc,
    name,
    rarity,
    artist,
    collectorNumber,
    isDigital,
    flavorText,
    foil,
    games,
    keywords,
    manaCost,
    mtgoId,
    multiverseIds,
    nonfoil,
    frame,
    frameEffects,
    arenaId,
    booster,
    edhrecRank,
    fullArt,
    layout,
    legalities,
    oracleText,
    pennyRank,
    prices,
    power,
    toughness,
    promo,
    purchaseUris,
    relatedUris,
    releasedAt,
    reprint,
    reserved,
    setName,
    set,
    setSearchUri,
    typeLine,
    variation,
    setType,
    children
  } = props

  const legalityEntries = legalities && Object.entries(legalities)
  const pricesEntries = prices && Object.entries(prices)
  const purchaseUrisEntries = purchaseUris && Object.entries(purchaseUris)
  const relatedUrisEntries = relatedUris && Object.entries(relatedUris)

  return (
    <Grid stackable columns="equal">
      <Grid.Column width={5}>
        <Image src={imgSrc} />
      </Grid.Column>
      <Grid.Column width={7}>
        <p>{name}</p>
        <p>{typeLine}</p>
        <p>
          setName:{' '}
          <a href={setSearchUri}>
            {setName} [{set}-{setType}]
          </a>
        </p>
        <p>power:{power ? power : '*'}</p>
        <p>toughness:{toughness ? toughness : '*'}</p>
        <p>artist: {artist}</p>
        <p>releasedAt: {releasedAt}</p>
        <p>collector number: {collectorNumber}</p>
        <p>edhrec_rank={edhrecRank ? edhrecRank : 'not ranked in EDHREC'}</p>
        <p>
          pennyRank: {pennyRank ? pennyRank : 'not ranked in Penny Dreadful'}
        </p>
        <p>Booster : {booster ? 'true' : 'false'}</p>
        <p>reprint : {reprint ? 'true' : 'false'}</p>
        <p>variation : {variation ? 'true' : 'false'}</p>
        <p>reserved : {reserved ? 'true' : 'false'}</p>
        <p>Digital: {isDigital ? 'true' : 'false'}</p>
        <p>promo: {promo ? 'true' : 'false'}</p>
        <p>layout: {layout}</p>
        <p>Foil: {foil ? 'true' : 'false'}</p>
        <p>Non Foil: {nonfoil ? 'true' : 'false'}</p>
        <p>full_art: {fullArt ? 'true' : 'false'}</p>
        <p>oracle-text: {oracleText ? oracleText : 'No text!'}</p>
        <div>rulings: {children}</div>
        <p>
          flavorText: {flavorText ? flavorText : 'There is no flavor text!'}
        </p>
        <div style={{ display: 'flex' }}>
          {games &&
            games.map((item, index) => {
              return (
                <p key={index}>
                  Games : <span> - {item} - </span>
                </p>
              )
            })}
        </div>
        <div style={{ display: 'flex' }}>
          {keywords &&
            keywords.map((item, index) => {
              return (
                <p key={index}>
                  Keywords : <span> - {item} - </span>
                </p>
              )
            })}
        </div>
        <p>arena-id: {arenaId ? arenaId : 'not available on Arena'}</p>
        <div style={{ display: 'flex' }}>
          {multiverseIds &&
            multiverseIds.map((item, index) => {
              return (
                <p key={index}>
                  multiverse-ids : <span> - {item} - </span>
                </p>
              )
            })}
        </div>
        <p>mtgo-id: {mtgoId ? mtgoId : 'not allowed online'}</p>
        <p>frame: {frame}</p>
        <div style={{ display: 'flex' }}>
          {frameEffects &&
            frameEffects.map((item, index) => {
              return (
                <p key={index}>
                  frame-effects : <span> - {item} - </span>
                </p>
              )
            })}
        </div>
        <div>
          <h1>relatedUris</h1>
          <ul>
            {relatedUris &&
              relatedUrisEntries &&
              relatedUrisEntries.map(([format, siteLink]) => (
                <li key={format}>
                  <a href={siteLink}>{format && format}</a>
                </li>
              ))}
          </ul>
        </div>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <p style={{ display: 'flex' }}>mana-cost :{manaCost}</p>
          <p>{rarity}</p>
          <div>
            <h1>Legalities</h1>
            <ul>
              {legalities &&
                legalityEntries &&
                legalityEntries.map(([format, legality]) => (
                  <li key={format}>
                    <strong>{format && format}:</strong> {legality && legality}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h1>Prices</h1>
            <ul>
              {prices &&
                pricesEntries &&
                pricesEntries.map(([format, price]) => (
                  <li key={format}>
                    <strong>{format && format}:</strong> {price && price}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h1>purchaseUris</h1>
            <ul>
              {purchaseUris &&
                purchaseUrisEntries &&
                purchaseUrisEntries.map(([format, siteLink]) => (
                  <li key={format}>
                    <a href={siteLink}>{format && format}</a>
                  </li>
                ))}
            </ul>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

const Rulings = (props) => {
  const { rulings } = props
  return (
    <div>
      {rulings.data &&
        rulings.data.map((comment) => {
          return (
            <div key={comment.oracle_id}>
              <p>{comment.comment}</p>
              <p>{comment.object}</p>
              <p>{comment.published_at}</p>
              <p>{comment.source}</p>
            </div>
          )
        })}
    </div>
  )
}

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
