import React from 'react'
import { Icon, Popover, Menu, MenuItem } from '@blueprintjs/core'

import Menus from './Menus'
import Songlist from './Songlist'
import MusicDetail from './MusicDetail'
import LoginDialog from './LoginDialog'
import authApis from 'apis/auth'
import songlistApis from 'apis/songlist'
import useAsyncFn from 'hooks/useAsyncFn'
import { LogStateContext, LogDispatchContext, ACTIONS } from 'reducers/log'
import { PlayMusicStateContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useState, useContext, useEffect } = React

const Sidebar = () => {
  const playState = useContext(PlayMusicStateContext)
  const dispatch = useContext(LogDispatchContext)
  const logState = useContext(LogStateContext)
  const { isLogined, user } = logState

  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [, logoutFn] = useAsyncFn(authApis.logout)
  const [songlistState, getUserSonglistFn] = useAsyncFn(songlistApis.getUserSonglist)

  useEffect(() => {
    if (isLogined) {
      getUserSonglistFn(logState.user.userId)
    }
  }, [isLogined])

  const handleNameClick = () => setShowLoginDialog(true)
  const handleLoginDialogClose = () => setShowLoginDialog(false)

  const handleLogout = async () => {
    await logoutFn()
    dispatch({ type: ACTIONS.LOGOUT })
  }

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {isLogined ? <img src={user.profile.avatarUrl} loading='lazy' /> : <Icon icon='person' />}
        </div>
        {isLogined ? (
          <Popover
            content={
              <Menu>
                <MenuItem icon='log-out' text='退出登录' onClick={handleLogout} />
              </Menu>
            }
            interactionKind='hover'
          >
            <div className={styles.name}>
              <span>{user.profile.nickname}</span>
              <Icon icon='play' />
            </div>
          </Popover>
        ) : (
          <div className={styles.name} onClick={handleNameClick}>
            <span>未登录</span>
            <Icon icon='play' />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <Menus />
        {!songlistState.loading && isLogined && (
          <>
            <div className={styles.block}>
              <Songlist title='创建的歌单' data={songlistState.value?.create} />
            </div>

            <div className={styles.block}>
              <Songlist title='收藏的歌单' data={songlistState.value?.collect} />
            </div>
          </>
        )}
      </div>

      {showLoginDialog && <LoginDialog isOpen={showLoginDialog} onClose={handleLoginDialogClose} />}
      {!!playState.musicId && <MusicDetail />}
    </div>
  )
}

export default Sidebar
