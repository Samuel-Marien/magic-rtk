import React from 'react'
import { Dropdown, Form as SemanticForm } from 'semantic-ui-react'

const MyDropdown = (props) => {
  const { form, values, name, iconName, options } = props
  return (
    <SemanticForm.Field name={name}>
      <Dropdown
        button
        className="icon"
        floating
        labeled
        basic
        icon={iconName}
        name={name}
        value={values.name}
        options={options}
        search
        text={options.filter((option) => option.value === values[name])[0].text}
        onChange={(e, { value }) => {
          form.change(name, value)
        }}
      />
    </SemanticForm.Field>
  )
}

export default MyDropdown
