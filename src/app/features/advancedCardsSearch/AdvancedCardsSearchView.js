import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Field } from 'react-final-form'
import {
  Input,
  Header,
  Segment,
  Button,
  Checkbox,
  Grid,
  Form as SemanticForm
} from 'semantic-ui-react'

import {
  fetchAdvancedCards,
  setAdvancedSearchParams
} from './advancedCardsSearchSlice'

import { dropdownOptionsArray } from './utils/dropdownOptions'

import AdvancedResult from './AdvancedResults'
import MyDropdown from './MyDropdown'

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

  // For easly splitted the dropdowns in 2 rows
  const renderGridRow = (options, form, values) => {
    return (
      <Grid.Row>
        {options.map((option) => (
          <MyDropdown
            form={form}
            values={values}
            name={option.name}
            iconName={option.iconName}
            options={option.options}
          />
        ))}
      </Grid.Row>
    )
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
                  {/* Serach by name  */}
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
                  </Grid.Row>

                  {/* dropdaown options splitted */}
                  {renderGridRow(
                    dropdownOptionsArray.slice(0, 3),
                    form,
                    values
                  )}
                  {renderGridRow(
                    dropdownOptionsArray.slice(3, 6),
                    form,
                    values
                  )}

                  {/* Checkbox options  */}
                  <Grid.Row>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
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

                {/* buttons  */}
                <div>
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
