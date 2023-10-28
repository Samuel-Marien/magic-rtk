import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Field } from 'react-final-form'

import {
  fetchAdvancedCards,
  setAdvancedSearchParams
} from './advancedCardsSearchSlice'
import AdvancedResult from './AdvancedResults'

import {
  Input,
  Header,
  Container,
  Segment,
  Card,
  Image,
  Icon,
  Button
} from 'semantic-ui-react'

import Loaders from '../../../components/Loaders'

const AdvancedCardsSearchView = () => {
  const search = useSelector((state) => state.advancedCards.searchParams)
  const error = useSelector((state) => state.advancedCards.error)
  console.log(error)
  const dispatch = useDispatch()

  const initialValues = {
    cardName: '',
    color: '*',
    variations: false,
    includeExtras: false,
    rarity: 'uncommon'
  }

  useEffect(() => {
    dispatch(fetchAdvancedCards(search))
  }, [search, dispatch, initialValues])

  const onSubmit = (values) => {
    // console.log(values)
    dispatch(setAdvancedSearchParams({ ...initialValues, ...values }))
  }

  // console.log(search)

  return (
    <>
      <Header
        as="h1"
        style={{
          color: 'white',
          marginRight: '2rem',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}
      >
        Advanced cards search
      </Header>

      <Segment>
        {error && <p>Une erreur s'est produite : {error}</p>}
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Card name</label>
                <Field
                  name="cardName"
                  component="input"
                  placeholder="card name"
                  value={values.cardName}
                />
              </div>
              <div>
                <label>Include variations</label>
                <Field name="variations" component="input" type="checkbox" />
                <label>Include extras</label>
                <Field name="includeExtras" component="input" type="checkbox" />
              </div>
              <div>
                <label>Color</label>
                <Field name="color" component="select">
                  <option />
                  <option value="*">All</option>
                  <option value="white">White</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="multicolor">multicolor</option>
                  <option value="colorless">colorless</option>
                </Field>
              </div>
              <div>
                <label>Rarity</label>
                <Field name="rarity" component="select">
                  <option />
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="mythic">Mythic</option>
                </Field>
              </div>
              {/* //buttons  */}
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </Segment>

      <AdvancedResult />
    </>
  )
}

export default AdvancedCardsSearchView
