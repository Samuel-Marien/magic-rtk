import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Grid,
  Image,
  Segment,
  Container,
  Header,
  Icon,
  Divider,
  Button,
  Item,
  Comment,
  List
} from 'semantic-ui-react'

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

  const frameDef = (frame) => {
    switch (frame) {
      case '1993':
        return 'The original Magic card frame, starting from Limited Edition Alpha.'
      case '1997':
        return 'The updated classic frame starting from Mirage block.'
      case '2003':
        return 'The “modern” Magic card frame, introduced in Eighth Edition and Mirrodin block.'
      case '2015':
        return 'The holofoil-stamp Magic card frame, introduced in Magic 2015.'
      case 'future':
        return 'The frame used on cards from the future'
      default:
        return 'There is no frame!'
    }
  }

  const frameEffetsDef = (frameEffects) => {
    switch (frameEffects) {
      case 'legendary':
        return 'The cards have a legendary crown'
      case 'miracle':
        return 'The miracle frame effect'
      case 'nyxtouched':
        return 'The Nyx-touched frame effect'
      case 'draft':
        return 'The draft-matters frame effect'
      case 'devoid':
        return 'The Devoid frame effect'
      case 'tombstone':
        return 'The Odyssey tombstone mark'
      case 'colorshifted':
        return 'A colorshifted frame'
      case 'inverted':
        return 'The FNM-style inverted frame'
      case 'sunmoondfc':
        return 'The sun and moon transform marks'
      case 'compasslanddfc':
        return 'The compass and land transform marks'
      case 'originpwdfc':
        return 'The Origins and planeswalker transform marks'
      case 'mooneldrazidfc':
        return 'The moon and Eldrazi transform marks'
      case 'waxingandwaningmoondfc':
        return 'The waxing and waning crescent moon transform marks'
      case 'showcase':
        return 'A custom Showcase frame'
      case 'extendedart':
        return 'An extended art frame'
      case 'companion':
        return 'The cards have a companion frame'
      case 'etched':
        return 'The cards have an etched foil treatment'
      case 'snow':
        return 'The cards have the snowy frame effect'
      case 'lesson':
        return 'The cards have the Lesson frame effect'
      case 'shatteredglass':
        return 'The cards have the Shattered Glass frame effect'
      case 'convertdfc':
        return 'The cards have More Than Meets the Eye™ marks'
      case 'fandfc':
        return 'The cards have fan transforming marks'
      case 'upsidedowndfc':
        return 'The cards have the Upside Down transforming marks'

      default:
        return 'There is no frame effects!'
        break
    }
  }

  const legalityEntries = legalities && Object.entries(legalities)
  const pricesEntries = prices && Object.entries(prices)
  const purchaseUrisEntries = purchaseUris && Object.entries(purchaseUris)
  const relatedUrisEntries = relatedUris && Object.entries(relatedUris)

  return (
    <Grid stackable columns="equal">
      <Grid.Column width={5}>
        <Image src={imgSrc} />
        <Item.Description style={{ margin: '7px 0 7px 0' }}>
          <Icon name="paint brush" color="grey" /> {artist}
        </Item.Description>
        <Segment>
          <div>
            <Header as="h3">Prices</Header>
            <List>
              {prices &&
                pricesEntries &&
                pricesEntries.map(([format, price]) => (
                  <List.Item key={format}>
                    <strong>{format && format}:</strong> {price ? price : 'N/A'}
                    <span>
                      <Icon
                        name={
                          format === 'usd' ||
                          format === 'usd_foil' ||
                          format === 'usd_etched'
                            ? 'dollar'
                            : 'euro'
                        }
                        color="grey"
                      />
                    </span>
                  </List.Item>
                ))}
            </List>
          </div>
          <div>
            <h1>Purchase webs sites</h1>
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
      <Grid.Column width={7}>
        <Header as="h1" dividing>
          {name}
        </Header>
        <p>
          <Icon name="id card" color="grey" />
          {typeLine}
        </p>

        <p>
          <Icon name="box" color="grey" />
          <a href={setSearchUri}>
            {setName} [{set}-{setType}]
          </a>
        </p>
        <p>
          <Icon name="calendar" color="grey" />
          {releasedAt}
        </p>

        <p>
          <Icon name="grab" color="grey" />
          {power ? power : '*'}/{toughness ? toughness : '*'}
        </p>

        <Divider />
        <Grid stackable>
          <Grid.Column width={8}>
            <p>
              <Icon name="certificate" color="grey" />
              Collector number:{' '}
              <span
                style={{
                  fontWeight: 'bolder',
                  color: 'grey'
                }}
              >
                {collectorNumber}
              </span>
            </p>
            <p>
              <Icon name="certificate" color="grey" />
              EDHREC rank:{' '}
              <span
                style={{
                  fontWeight: 'bolder',
                  color: 'grey'
                }}
              >
                {edhrecRank ? edhrecRank : 'not ranked!'}
              </span>
            </p>
            <p>
              <Icon name="certificate" color="grey" />
              Penny rank:{' '}
              <span
                style={{
                  fontWeight: 'bolder',
                  color: 'grey'
                }}
              >
                {pennyRank ? pennyRank : 'not ranked!'}
              </span>
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              <Icon name="hashtag" color="grey" />
              arena-id:{' '}
              <span
                style={{
                  fontWeight: 'bolder',
                  color: 'grey'
                }}
              >
                {arenaId ? arenaId : 'not available on Arena'}
              </span>
            </p>
            <p style={{ display: 'flex' }}>
              <Icon name="hashtag" color="grey" />
              multiverse-ids:
              {multiverseIds &&
                multiverseIds.map((item, index) => {
                  return (
                    <span key={index}>
                      <span
                        style={{
                          fontWeight: 'bolder',
                          color: 'grey',
                          marginRight: '5px'
                        }}
                      >
                        {item}
                      </span>
                    </span>
                  )
                })}
            </p>
            <p>
              <Icon name="hashtag" color="grey" />
              mtgo-id:{' '}
              <span
                style={{
                  fontWeight: 'bolder',
                  color: 'grey'
                }}
              >
                {mtgoId ? mtgoId : 'not allowed online'}
              </span>
            </p>
          </Grid.Column>
        </Grid>

        <Divider />
        <Button.Group
          attached="top"
          compact
          size="mini"
          widths={1}
          style={{ display: 'flex ', flexWrap: 'wrap' }}
        >
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={booster ? 'green' : 'red'}
          >
            Booster
          </Button>
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={reprint ? 'green' : 'red'}
          >
            Reprint
          </Button>
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={variation ? 'green' : 'red'}
          >
            Variation
          </Button>

          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={reserved ? 'green' : 'red'}
          >
            Reserved
          </Button>
        </Button.Group>
        <Button.Group
          attached="bottom"
          compact
          size="mini"
          widths={1}
          style={{ display: 'flex ', flexWrap: 'wrap' }}
        >
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={isDigital ? 'green' : 'red'}
          >
            Digital
          </Button>
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={promo ? 'green' : 'red'}
          >
            Promo
          </Button>
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={foil ? 'green' : 'red'}
          >
            Foil
          </Button>
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={nonfoil ? 'green' : 'red'}
          >
            Non Foil
          </Button>
          <Button
            style={{ height: '30px', fontWeight: 'bold' }}
            size="mini"
            disabled
            basic
            color={fullArt ? 'green' : 'red'}
          >
            Full-art
          </Button>
        </Button.Group>
        <Divider />
        {keywords && keywords.length > 0 && (
          <div style={{ display: 'flex', marginBottom: '14px' }}>
            <Icon name="tags" color="grey" />
            {keywords &&
              keywords.map((item, index) => {
                return (
                  <p key={index}>
                    <span style={{ fontWeight: 'bolder', marginRight: '5px' }}>
                      {item}{' '}
                    </span>
                  </p>
                )
              })}
          </div>
        )}
        <Item.Description style={{ marginBottom: '14px' }}>
          <Icon name="book" color="grey" />
          {oracleText ? oracleText : 'No text!'}
        </Item.Description>
        <Item.Description style={{ marginBottom: '14px', fontStyle: 'italic' }}>
          <Icon name="comment alternate" color="grey" />
          {flavorText ? flavorText : 'There is no flavor text!'}
        </Item.Description>
        <Divider />
        <Item.Description>{children}</Item.Description>

        <Divider />
        <p>
          <Icon name="magic" color="grey" />
          {frameDef(frame)}
        </p>
        <div>
          <Icon name="magic" color="grey" />
          Frame-effects :
          {frameEffects &&
            frameEffects.map((item, index) => {
              return <span key={index}>{frameEffetsDef(item)}. </span>
            })}
        </div>
        <p>layout: {layout}</p>
        <Divider />
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
          <div
            style={{
              display: 'flex'
            }}
          >
            {games &&
              games.map((item, index) => {
                return (
                  <p key={index}>
                    <span
                      style={{
                        fontWeight: 'bolder',
                        marginRight: '5px',
                        backgroundColor: 'grey',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '5px'
                      }}
                    >
                      {item}
                    </span>
                  </p>
                )
              })}
          </div>
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
          {/* <div>
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
          </div> */}
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

const Rulings = (props) => {
  const { rulings } = props

  return (
    <Comment.Group size="small">
      <Comment.Text style={{ fontSize: '14px' }}>
        <Icon name="cube" color="grey" />
        Rulings represent Oracle rulings, Wizards of the Coast set release
        notes, or Scryfall notes for a particular card.
      </Comment.Text>
      {rulings.data &&
        rulings.data.map((comment, index) => {
          return (
            <Comment key={index}>
              <Comment.Avatar src="/images/pngegg.png" />
              <Comment.Content>
                <Comment.Author>
                  <Icon name="users" color="grey" />
                  {comment.source}
                  <Comment.Metadata>
                    <Icon name="calendar" color="grey" />
                    {comment.published_at}
                  </Comment.Metadata>
                </Comment.Author>

                <Comment.Text>{comment.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        })}
    </Comment.Group>
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
  console.log(rulings)

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
