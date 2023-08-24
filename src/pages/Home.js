import Navbar from '../components/Navbar'
import QuickSearchView from '../app/features/quickSearch/QuickSearchView'
import QuickSearchResultsView from '../app/features/quickSearch/QuickSearchResultsView'

import { Card, Image, Container, Icon, Button } from 'semantic-ui-react'

function Home() {
  return (
    <div
      style={{
        height: '800px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, 
        rgba(255, 255, 255, 1) 100%), 
        url('../images/bg6.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <Container fluid style={{ padding: '0 5% 0 5%' }}>
        <QuickSearchView />
        <QuickSearchResultsView />
      </Container>
    </div>
  )
}

export default Home
