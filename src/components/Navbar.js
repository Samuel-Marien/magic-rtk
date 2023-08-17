import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('cards')

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu stackable inverted style={{ borderRadius: '0px' }}>
      <Menu.Item>
        <Header
          color="grey"
          as="h4"
          image="https://react.semantic-ui.com/logo.png"
          content="MTG Card's Tracker"
        />
      </Menu.Item>

      <Menu.Item
        name="cards"
        active={activeItem === 'cards'}
        onClick={handleItemClick}
      >
        <Icon name="tag" color="grey" />
        Cards
      </Menu.Item>
      <Menu.Item
        name="sets"
        active={activeItem === 'sets'}
        onClick={handleItemClick}
      >
        <Icon name="tags" color="grey" />
        Sets
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
