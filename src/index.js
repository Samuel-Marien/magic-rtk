import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

import store from './app/store'

import Home from './pages/Home'
import CardDetails from './pages/CardDetails'
import CardSearch from './pages/CardSearch'
import SetSearch from './pages/SetSearch'
import SetDetails from './pages/SetDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/card-search',
    element: <CardSearch />
  },
  {
    path: '/set-search',
    element: <SetSearch />
  },
  {
    path: '/card-details/:id',
    element: <CardDetails />
  },
  {
    path: '/set-details/:code',
    element: <SetDetails />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
