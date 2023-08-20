import Navbar from '../components/Navbar'
import QuickSearchView from '../app/features/quickSearch/QuickSearchView'
import QuickSearchResultsView from '../app/features/quickSearch/QuickSearchResultsView'

function Home() {
  return (
    <>
      <Navbar />
      <QuickSearchView />
      <QuickSearchResultsView />
    </>
  )
}

export default Home
