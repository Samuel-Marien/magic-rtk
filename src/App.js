import Navbar from './components/Navbar'
import QuickSearchView from './app/features/quickSearch/QuickSearchView'
import QuickSearchResultsView from './app/features/quickSearch/QuickSearchResultsView'

function App() {
  return (
    <div>
      <Navbar />
      <QuickSearchView />
      <QuickSearchResultsView />
    </div>
  )
}

export default App
