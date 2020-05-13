import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import Discovery from './Discovery'
import Videos from './Videos'
import Search from './Search'
import SonglistDetail from './SonglistDetail'

import useAudio from 'hooks/useAudio'
import { MODE } from 'helpers/play'
import playMusicReducer, { initialState, PlayMusicStateContext, PlayMusicDispatchContext, AudioContext, ACTIONS } from 'reducers/playMusic'
import logReducer, { initialState as logInitialState, LogStateContext, LogDispatchContext } from 'reducers/log'
import { IMyMusic } from 'apis/types/business'
import ROUTES from 'constants/routes'

const { useReducer, useMemo, useCallback } = React

const App = () => {
  const [logState, logDispath] = useReducer(logReducer, logInitialState)
  const [state, dispatch] = useReducer(playMusicReducer, initialState)

  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: state.musicUrl,
    autoPlay: true,
    onEnded: () => onRadioEnded()
  })

  const audioInfo = useMemo(() => {
    return {
      audio,
      state: audioState,
      controls: audioControls,
      ref: audioRef
    }
  }, [state.musicUrl, audio, audioState, audioControls, audioRef])

  const onRadioEnded = useCallback(() => {
    const { playMode, playList, musicId } = state

    switch (playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = playList.findIndex(({ id }: IMyMusic) => id === musicId)
        if (playList.length) {
          const nextIdx = idx > -1 ? (idx + 1) % playList.length : 0
          dispatch({
            type: ACTIONS.PLAY,
            payload: {
              musicId: playList[nextIdx].id,
              music: playList[nextIdx]
            }
          })
        }
        return
      }
      case MODE.SINGLE_CYCLE: {
        audioControls.play()
        return
      }
      case MODE.SHUFFLE_PLAYBACK: {
        if (playList.length) {
          const randomIdx = Math.floor(Math.random() * playList.length)
          dispatch({
            type: ACTIONS.PLAY,
            payload: {
              musicId: playList[randomIdx].id,
              music: playList[randomIdx]
            }
          })
        }
        return
      }
      default:
        return
    }
  }, [state.musicId, state.playList, state.playMode, audioControls])

  return (
    <BrowserRouter>
      <LogDispatchContext.Provider value={logDispath}>
        <LogStateContext.Provider value={logState}>
          <PlayMusicDispatchContext.Provider value={dispatch}>
            <PlayMusicStateContext.Provider value={state}>
              <AudioContext.Provider value={audioInfo}>
                <Layout>
                  {audio}
                  <Switch>
                    <Route path={ROUTES.DISCOVERY} component={Discovery} />
                    <Route path={ROUTES.VIDEOS} component={Videos} />
                    <Route exact path={ROUTES.SEARCH} component={Search} />
                    <Route exact path={ROUTES.SONG_LIST_DETAIL} component={SonglistDetail} />
                    <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
                  </Switch>
                </Layout>
              </AudioContext.Provider>
            </PlayMusicStateContext.Provider>
          </PlayMusicDispatchContext.Provider>
        </LogStateContext.Provider>
      </LogDispatchContext.Provider>
    </BrowserRouter>
  )
}

export default App
