import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import Discovery from './Discovery'
import Videos from './Videos'
import Search from './Search'

import ROUTES from 'constants/routes'
import playMusicReducer, {
  initialState,
  PlayMusicStateContext,
  PlayMusicDispatchContext
} from 'reducers/playMusic'

const { useReducer } = React

const App = () => {
  const [state, dispatch] = useReducer(playMusicReducer, initialState)

  console.log('state => ', state)

  return (
    <BrowserRouter>
      <PlayMusicDispatchContext.Provider value={dispatch}>
        <PlayMusicStateContext.Provider value={state}>
          <Layout>
            <Switch>
              <Route path={ROUTES.DISCOVERY} component={Discovery} />
              <Route path={ROUTES.VIDEOS} component={Videos} />
              <Route exact path={ROUTES.SEARCH} component={Search} />
              <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
            </Switch>
          </Layout>
        </PlayMusicStateContext.Provider>
      </PlayMusicDispatchContext.Provider>
    </BrowserRouter>
  )
}

export default App
