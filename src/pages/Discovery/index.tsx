import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import Recommendation from './Recommendation'
import SongList from './SongList'
import LeaderBoard from './LeaderBoard'
import Singers from './Singers'
import LatestMusic from './LatestMusic'
import ROUTES from 'constants/routes'

const Discovery = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={ROUTES.RECOMMENDATION} component={Recommendation} />
        <Route exact path={ROUTES.SONG_LIST} component={SongList} />
        <Route exact path={ROUTES.LEADER_BOARD} component={LeaderBoard} />
        <Route exact path={ROUTES.SINGERS} component={Singers} />
        <Route exact path={ROUTES.LATEST_MUSIC} component={LatestMusic} />
        {/* /discovery 或者 不匹配上面路由的，都显示Recommendation */}
        <Route exact path={ROUTES.DISCOVERY} component={Recommendation} />
        <Redirect from={`${ROUTES.DISCOVERY}/*`} to={ROUTES.RECOMMENDATION} />
      </Switch>
    </Layout>
  )
}

export default Discovery
