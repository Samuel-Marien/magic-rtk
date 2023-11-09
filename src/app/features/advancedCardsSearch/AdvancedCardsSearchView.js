import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Field } from 'react-final-form'
import {
  Dropdown,
  Input,
  Header,
  Segment,
  Button,
  Radio,
  Checkbox,
  Form as SemanticForm
} from 'semantic-ui-react'

import {
  fetchAdvancedCards,
  setAdvancedSearchParams
} from './advancedCardsSearchSlice'

import {
  colorsOptions,
  rarityOptions,
  orderOptions,
  uniqueOptions
} from './utils/dropdownOptions'

import AdvancedResult from './AdvancedResults'

import Loaders from '../../../components/Loaders'

const AdvancedCardsSearchView = () => {
  const search = useSelector((state) => state.advancedCards.searchParams)
  const error = useSelector((state) => state.advancedCards.error)
  // console.log(error)
  const dispatch = useDispatch()

  const initialValues = {
    cardName: '',
    color: '*',
    variations: false,
    includeExtras: false,
    rarity: 'common',
    order: 'cmc',
    dir: 'desc',
    unique: 'cards'
  }

  useEffect(() => {
    dispatch(fetchAdvancedCards(search))
  }, [search, dispatch, initialValues])

  const onSubmit = (values) => {
    // console.log(values)
    dispatch(setAdvancedSearchParams({ ...initialValues, ...values }))
  }

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
          render={({ handleSubmit, form, submitting, pristine, values }) => {
            console.log(values)
            // console.log(form.getState())
            // console.log(form)
            return (
              <form onSubmit={handleSubmit}>
                <Segment style={{ display: 'flex' }}>
                  <Field name="cardName">
                    {(props) => {
                      return (
                        <SemanticForm.Field>
                          <label>Card name</label>
                          <Input
                            {...props.input}
                            placeholder="eg: norn, nezumi..."
                          />
                        </SemanticForm.Field>
                      )
                    }}
                  </Field>
                  <div>
                    <label>Color</label>
                    <Dropdown
                      name="color"
                      value={values.color}
                      placeholder="Color"
                      selection
                      options={colorsOptions}
                      onChange={(e, { value }) => {
                        form.change('color', value)
                      }}
                    />
                  </div>
                  <div>
                    <label>Rarity</label>
                    <Dropdown
                      name="rarity"
                      value={values.rarity}
                      placeholder="Rarity"
                      selection
                      options={rarityOptions}
                      onChange={(e, { value }) => {
                        form.change('rarity', value)
                      }}
                    />
                  </div>
                  <div>
                    <label>Prints</label>
                    <Dropdown
                      name="unique"
                      value={values.unique}
                      selection
                      options={uniqueOptions}
                      onChange={(e, { value }) => {
                        form.change('unique', value)
                      }}
                    />
                  </div>
                  <div>
                    <Checkbox
                      name="variations"
                      label="Variations"
                      onChange={(e, { checked }) => {
                        form.change('variations', checked)
                      }}
                      checked={values.variations}
                    />
                    <Checkbox
                      name="includeExtras"
                      label="Extras"
                      onChange={(e, { checked }) => {
                        form.change('includeExtras', checked)
                      }}
                      checked={values.includeExtras}
                    />
                  </div>
                </Segment>
                <Segment style={{ display: 'flex', alignItems: 'center' }}>
                  <label>Order</label>
                  <Dropdown
                    name="order"
                    value={values.order}
                    selection
                    options={orderOptions}
                    onChange={(e, { value }) => {
                      dispatch(fetchAdvancedCards({ ...values, order: value }))
                      // form.change('order', value)
                    }}
                  />
                  <div>
                    <Radio
                      toggle
                      checked={values.dir === 'desc'}
                      onChange={(e, { checked }) => {
                        const dir = checked ? 'desc' : 'asc'
                        form.change('dir', dir)
                        dispatch(fetchAdvancedCards({ ...values, dir }))
                      }}
                    />
                  </div>
                </Segment>
                {/* //buttons  */}
                <div className="buttons">
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={form.reset}>
                    Reset
                  </Button>
                </div>
              </form>
            )
          }}
        />
      </Segment>

      <AdvancedResult />
    </>
  )
}

export default AdvancedCardsSearchView
