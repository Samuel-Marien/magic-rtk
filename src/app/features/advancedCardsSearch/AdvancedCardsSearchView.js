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
  uniqueOptions
} from './utils/dropdownOptions'

import AdvancedResult from './AdvancedResults'

import Loaders from '../../../components/Loaders'

const AdvancedCardsSearchView = () => {
  const search = useSelector((state) => state.advancedCards.searchParams)
  console.log(search)

  const dispatch = useDispatch()

  const initialValues = {
    cardName: '',
    color: '*',
    variations: false,
    includeExtras: false,
    rarity: '*',
    order: 'released',
    dir: 'desc',
    unique: 'arts'
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
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => {
            // console.log(values)
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
                      placeholder="All"
                      selection
                      options={rarityOptions}
                      onChange={(e, { value }) => {
                        form.change('rarity', value)
                      }}
                    />
                  </div>
                  <div>
                    <label>Unique</label>
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
                {/* //buttons  */}
                <div className="buttons">
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={form.reset}>
                    Reset
                  </Button>
                </div>
                <AdvancedResult form={form} />
              </form>
            )
          }}
        />
      </Segment>
    </>
  )
}

export default AdvancedCardsSearchView
