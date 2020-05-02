import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import Video from './Video'
import MV from './MV'
import ROUTES from 'constants/routes'

const Videos = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={ROUTES.VIDEO} component={Video} />
        <Route exact path={ROUTES.MV} component={MV} />
        <Route exact path={ROUTES.VIDEOS} component={Video} />
        <Redirect from={`${ROUTES.VIDEOS}/*`} to={ROUTES.VIDEO} />
      </Switch>
    </Layout>
  )
}

export default Videos
