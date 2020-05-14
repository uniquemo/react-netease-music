import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ROUTES from 'constants/routes'

const { Suspense, lazy } = React

const Video = lazy(() => import('./Video'))
const MV = lazy(() => import('./MV'))

const Videos = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path={ROUTES.VIDEO} component={Video} />
        <Route exact path={ROUTES.MV} component={MV} />
        <Route exact path={ROUTES.VIDEOS} component={Video} />
        <Redirect from={`${ROUTES.VIDEOS}/*`} to={ROUTES.VIDEO} />
      </Switch>
    </Suspense>
  )
}

export default Videos
