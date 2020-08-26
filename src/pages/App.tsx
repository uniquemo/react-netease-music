import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import useAudio from 'hooks/useAudio'
import { MODE, playList as playListLocalStorage } from 'helpers/play'
import playMusicReducer, {
  initialState,
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  AudioContext,
  ACTIONS,
} from 'reducers/playMusic'
import logReducer, { initialState as logInitialState, LogStateContext, LogDispatchContext } from 'reducers/log'
import { IMyMusic } from 'apis/types/business'
import ROUTES from 'constants/routes'

const { useReducer, useMemo, useCallback, lazy, Suspense } = React

const Discovery = lazy(() => import('./Discovery'))
const Videos = lazy(() => import('./Videos'))
const Search = lazy(() => import('./Search'))
const SonglistDetail = lazy(() => import('./SonglistDetail'))

const App = () => {
  const [logState, logDispath] = useReducer(logReducer, logInitialState)
  const [state, dispatch] = useReducer(playMusicReducer, initialState)
  const { musicId, musicUrl, playMode } = state

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: musicUrl,
    autoPlay: true,
    onEnded: () => playNextMusic(),
    onError: () => {
      if (playMode === MODE.SINGLE_CYCLE) {
        return
      }
      playNextMusic()
    },
  })

  const audioInfo = useMemo(() => {
    return {
      audio,
      state: audioState,
      controls: audioControls,
      ref: audioRef,
    }
  }, [musicUrl, audio, audioState, audioControls, audioRef])

  const playMusic = useCallback(
    (index: number) => {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[index].id,
          music: playList[index],
        },
      })
    },
    [playList],
  )

  const playNextMusic = useCallback(() => {
    switch (playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = playList.findIndex(({ id }: IMyMusic) => id === musicId)
        if (playList.length) {
          const nextIdx = idx > -1 ? (idx + 1) % playList.length : 0
          playMusic(nextIdx)
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
          playMusic(randomIdx)
        }
        return
      }
      default:
        return
    }
  }, [musicId, playMode, audioControls, playList])

  return (
    <BrowserRouter>
      <LogDispatchContext.Provider value={logDispath}>
        <LogStateContext.Provider value={logState}>
          <PlayMusicDispatchContext.Provider value={dispatch}>
            <PlayMusicStateContext.Provider value={state}>
              <AudioContext.Provider value={audioInfo}>
                <Layout>
                  {audio}
                  <Suspense fallback={null}>
                    <Switch>
                      <Route path={ROUTES.DISCOVERY} component={Discovery} />
                      <Route path={ROUTES.VIDEOS} component={Videos} />
                      <Route exact path={ROUTES.SEARCH} component={Search} />
                      <Route exact path={ROUTES.SONG_LIST_DETAIL} component={SonglistDetail} />
                      <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
                    </Switch>
                  </Suspense>
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
