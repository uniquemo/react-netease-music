import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import Discovery from './Discovery'
import Videos from './Videos'
import Search from './Search'

import useAudio from 'hooks/useAudio'
import ROUTES from 'constants/routes'
import playMusicReducer, {
  initialState,
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  AudioContext
} from 'reducers/playMusic'

const { useReducer, useMemo } = React

const App = () => {
  const [state, dispatch] = useReducer(playMusicReducer, initialState)
  const [audio, audioState, audioControls, audioRef] = useAudio({ src: state.musicUrl, autoPlay: true })

  console.log('state => ', state)

  const audioInfo = useMemo(() => {
    return {
      audio,
      state: audioState,
      controls: audioControls,
      ref: audioRef
    }
  }, [state.musicUrl, audio, audioState, audioControls, audioRef])

  return (
    <BrowserRouter>
      <PlayMusicDispatchContext.Provider value={dispatch}>
        <PlayMusicStateContext.Provider value={state}>
          <AudioContext.Provider value={audioInfo}>
            <Layout>
              {audio}
              <Switch>
                <Route path={ROUTES.DISCOVERY} component={Discovery} />
                <Route path={ROUTES.VIDEOS} component={Videos} />
                <Route exact path={ROUTES.SEARCH} component={Search} />
                <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
              </Switch>
            </Layout>
          </AudioContext.Provider>
        </PlayMusicStateContext.Provider>
      </PlayMusicDispatchContext.Provider>
    </BrowserRouter>
  )
}

export default App
