import './App.css'
import { Router } from './Router'
import Page404 from './pages/404'
import SearchPage from './pages/Search'
import {Route} from './Route'
import { lazy } from 'react'
import { Suspense } from 'react'

const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) //Import dinamico

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {

  return (
    <>
      <main>
        <Suspense fallback={<div>Cargando</div>}>
          <Router routes={routes} defaultComponent={Page404}>
            <Route path='/' Component={LazyHomePage} />
            <Route path='/about' Component={LazyAboutPage} />
          </Router>
        </Suspense>
      </main >
    </>
  )
}

export default App
