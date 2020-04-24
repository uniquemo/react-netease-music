import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Discovery from './Discovery'
import ROUTES from 'constants/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.ROOT} component={Discovery} />
        <Route path="*" component={Discovery} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
