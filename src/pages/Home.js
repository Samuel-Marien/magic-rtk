import Navbar from '../components/Navbar'
import QuickSearchView from '../app/features/quickSearch/QuickSearchView'
import QuickSearchResultsView from '../app/features/quickSearch/QuickSearchResultsView'

function Home() {
  return (
    <div
      style={{
        height: '800px',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, 
        rgba(255, 255, 255, 1) 100%), 
        url('../images/bg12.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
      }}
    >
      <Navbar />
      <QuickSearchView />
      <QuickSearchResultsView />
    </div>
  )
}

export default Home
