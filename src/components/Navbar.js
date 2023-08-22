import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHref } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('')
  const test = useHref()

  useEffect(() => {
    if (test === '/') {
      setActiveItem('home')
    } else if (test === '/card-search') {
      setActiveItem('cards')
    } else if (test === '/set-search') {
      setActiveItem('sets')
    }
  }, [test])

  return (
    <Menu stackable inverted style={{ borderRadius: '0px' }}>
      <Menu.Item name="home" href="/">
        <Header
          color="grey"
          as="h5"
          image="/images/pngegg.png"
          // image="https://react.semantic-ui.com/logo.png"
          content="MTG Tracker"
        />
      </Menu.Item>

      <Menu.Item as="div" href="/" name="home" active={activeItem === 'home'}>
        <Link to="/">
          <Icon name="home" color="grey" />
          Home
        </Link>
      </Menu.Item>

      <Menu.Item as="div" name="cards" active={activeItem === 'cards'}>
        <Link to="/card-search">
          <Icon name="id badge" color="grey" />
          Cards
        </Link>
      </Menu.Item>

      <Menu.Item as="div" name="sets" active={activeItem === 'sets'}>
        <Link to="/set-search">
          <Icon name="box" color="grey" />
          Sets
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
