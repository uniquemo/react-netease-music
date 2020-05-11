import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Recommendation from './Recommendation'
import Songlist from './Songlist'
import LeaderBoard from './LeaderBoard'
import Singers from './Singers'
import LatestMusic from './LatestMusic'
import RecommendDaily from './RecommendDaily'
import ROUTES from 'constants/routes'

import styles from './style.module.css'

const Discovery = () => {
  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path={ROUTES.RECOMMENDATION} component={Recommendation} />
        <Route exact path={ROUTES.SONG_LIST} component={Songlist} />
        <Route exact path={ROUTES.LEADER_BOARD} component={LeaderBoard} />
        <Route exact path={ROUTES.SINGERS} component={Singers} />
        <Route exact path={ROUTES.LATEST_MUSIC} component={LatestMusic} />
        <Route exact path={ROUTES.RECOMMEND_DAILY} component={RecommendDaily} />
        {/* /discovery 或者 不匹配上面路由的，都显示Recommendation */}
        <Route exact path={ROUTES.DISCOVERY} component={Recommendation} />
        <Redirect from={`${ROUTES.DISCOVERY}/*`} to={ROUTES.RECOMMENDATION} />
      </Switch>
    </div>
  )
}

export default Discovery
