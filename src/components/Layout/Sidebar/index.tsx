import React from 'react'
import { Icon, Popover, Menu, MenuItem } from '@blueprintjs/core'

import Menus from './Menus'
import LoginDialog from './LoginDialog'
import authApis from 'apis/auth'
import useAsyncFn from 'hooks/useAsyncFn'
import { LogStateContext, LogDispatchContext, ACTIONS } from 'reducers/log'
import styles from './style.module.css'

const { useState, useContext } = React

const Sidebar = () => {
  const dispatch = useContext(LogDispatchContext)
  const logState = useContext(LogStateContext)
  const { isLogined, user } = logState
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [logoutState, logoutFn] = useAsyncFn(authApis.logout)

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
            content={(
              <Menu>
                <MenuItem icon='log-out' text='退出登录' onClick={handleLogout} />
              </Menu>
            )}
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

      <Menus />

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={handleLoginDialogClose}
      />
    </div>
  )
}

export default Sidebar
