import React, { useState, useEffect } from 'react'

import { charToSvg } from '../../../common/charToSvg'

import {
  Grid,
  Image,
  Segment,
  Header,
  Icon,
  Divider,
  Button,
  Item,
  List
} from 'semantic-ui-react'

const MyCard = (props) => {
  const [svg, setSvg] = useState('')

  const [legalityEntries, setLegalityEntries] = useState('')
  const [pricesEntries, setPricesEntries] = useState('')
  const [purchaseUrisEntries, setPurchaseUrisEntries] = useState('')
  const [relatedUrisEntries, setRelatedUrisEntries] = useState('')

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

  const rarityToColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'grey'
      case 'uncommon':
        return 'teal '
      case 'rare':
        return 'yellow'
      case 'mythic':
        return 'brown'
      default:
        return 'black'
    }
  }

  useEffect(() => {
    setLegalityEntries(legalities && Object.entries(legalities))
    setPricesEntries(prices && Object.entries(prices))
    setPurchaseUrisEntries(purchaseUris && Object.entries(purchaseUris))
    setRelatedUrisEntries(relatedUris && Object.entries(relatedUris))
    setSvg(charToSvg(manaCost))
  }, [manaCost, legalities, prices, purchaseUris, relatedUris])

  return (
    <Grid stackable columns="equal">
      <Grid.Column>
        <Image
          src={imgSrc}
          style={{ borderRadius: '17px', boxShadow: '0px 0 7px black' }}
        />
        <Item.Description style={{ margin: '7px 0 7px 0' }}>
          <Icon name="paint brush" color="black" />{' '}
          <span style={{ fontWeight: 'bolder' }}>{artist}</span>
        </Item.Description>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
          <div>
            <Header dividing as="h3">
              Prices
            </Header>
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
          <div style={{ margin: '21px 0 ' }}>
            <Header dividing as="h3">
              Purchase webs sites
            </Header>

            <List>
              {purchaseUris &&
                purchaseUrisEntries &&
                purchaseUrisEntries.map(([format, siteLink]) => (
                  <List.Item key={format}>
                    <a target="blank" href={siteLink}>
                      {format && format}
                    </a>
                  </List.Item>
                ))}
            </List>
          </div>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
          <Header as="h1" dividing>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {name}
              <p style={{ display: 'flex' }}>
                {svg &&
                  svg.map((item, index) => {
                    return (
                      <Image
                        style={{
                          height: '25px',
                          width: '25px',
                          margin: '0 5px 0 0'
                        }}
                        key={index}
                        src={item}
                      />
                    )
                  })}
              </p>
            </div>
          </Header>

          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>
              <Icon name="id card" color="grey" />
              {typeLine}
            </span>
            <span
              style={{
                textTransform: 'capitalize',
                border: `1px solid ${rarityToColor(rarity)}`,
                boxShadow: `0px 0 3px ${rarityToColor(rarity)}`,
                borderRadius: '5px',
                padding: '2px'
              }}
            >
              <Icon name="star" color={rarityToColor(rarity)} />
              {rarity}
            </span>
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
          <p>
            <Icon name="magic" color="grey" />
            {frameDef(frame)}
          </p>
          {frameEffects && (
            <div>
              <Icon name="magic" color="grey" />
              Frame-effects :
              {frameEffects &&
                frameEffects.map((item, index) => {
                  return <span key={index}>{frameEffetsDef(item)}. </span>
                })}
            </div>
          )}
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
                      <span
                        style={{ fontWeight: 'bolder', marginRight: '5px' }}
                      >
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
          <Item.Description
            style={{ marginBottom: '14px', fontStyle: 'italic' }}
          >
            <Icon name="comment alternate" color="grey" />
            {flavorText ? flavorText : 'There is no flavor text!'}
          </Item.Description>
          <Divider />
          <Item.Description>{children}</Item.Description>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
          <Header as="h3" dividing>
            Available in{' '}
          </Header>
          <div
            style={{
              display: 'flex',

              marginBottom: '21px'
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
            <Header as="h3" dividing>
              Legalities
            </Header>

            <List>
              {legalities &&
                legalityEntries &&
                legalityEntries.map(([format, legality]) => (
                  <List.Item key={format}>
                    <span>
                      {legality === 'not_legal' && (
                        <Icon
                          style={{ textShadow: '0px 0 3px red' }}
                          name="stop circle"
                          color="red"
                        />
                      )}
                      {legality === 'legal' && (
                        <Icon
                          style={{ textShadow: '0px 0 3px green' }}
                          name="check circle"
                          color="green"
                        />
                      )}
                    </span>
                    <strong
                      style={{
                        textTransform: 'capitalize',
                        marginRight: '3px'
                      }}
                    >
                      {format && format}
                    </strong>
                  </List.Item>
                ))}
            </List>
          </div>
          <div style={{ marginTop: '21px' }}>
            <Header as="h3" dividing>
              Related webs sites
            </Header>
            <List>
              {relatedUris &&
                relatedUrisEntries &&
                relatedUrisEntries.map(([format, siteLink]) => (
                  <List.Item key={format}>
                    <a href={siteLink}>{format && format}</a>
                  </List.Item>
                ))}
            </List>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default MyCard
