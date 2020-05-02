import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Discovery from './Discovery'
import Videos from './Videos'
import ROUTES from 'constants/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.DISCOVERY} component={Discovery} />
        <Route path={ROUTES.VIDEOS} component={Videos} />
        <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
