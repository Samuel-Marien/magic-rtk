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
  Label,
  Grid,
  Form as SemanticForm
} from 'semantic-ui-react'

import {
  fetchAdvancedCards,
  setAdvancedSearchParams
} from './advancedCardsSearchSlice'

import {
  colorsOptions,
  rarityOptions,
  uniqueOptions,
  powerOptions,
  toughnessOptions
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
    unique: 'arts',
    power: '∞',
    toughness: '∞',
    manaValue: '?'
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
                <Grid columns={8} divided style={{ display: 'flex' }}>
                  <Grid.Row>
                    <Field name="cardName">
                      {(props) => {
                        return (
                          <SemanticForm.Field>
                            <Input
                              label="Card name"
                              {...props.input}
                              placeholder="eg: norn, nezumi..."
                            />
                          </SemanticForm.Field>
                        )
                      }}
                    </Field>

                    <SemanticForm.Field name="power">
                      <Label>Power</Label>
                      <Dropdown
                        name="power"
                        value={values.power}
                        placeholder="Power"
                        selection
                        options={powerOptions}
                        onChange={(e, { value }) => {
                          form.change('power', value)
                        }}
                      />
                    </SemanticForm.Field>
                    <SemanticForm.Field name="toughness">
                      <Label>Toughness</Label>
                      <Dropdown
                        name="toughness"
                        value={values.toughness}
                        placeholder="Toughness"
                        selection
                        options={toughnessOptions}
                        onChange={(e, { value }) => {
                          form.change('toughness', value)
                        }}
                      />
                    </SemanticForm.Field>

                    <Field name="manaValue">
                      {(props) => {
                        return (
                          <SemanticForm.Field>
                            <Input
                              min={0}
                              placeholder="eg: 1, 3, 7..."
                              label="Mana value"
                              type="text"
                              {...props.input}
                            />
                          </SemanticForm.Field>
                        )
                      }}
                    </Field>
                    <div>
                      <Label>Color</Label>
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
                      <Label>Rarity</Label>
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
                      <Label>Unique</Label>
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  </Grid.Row>
                </Grid>
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
