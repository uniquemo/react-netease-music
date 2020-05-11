import React from 'react'
import { Icon, Popover, Menu, MenuItem } from '@blueprintjs/core'

import Menus from './Menus'
import LoginDialog from './LoginDialog'
import { getSession, removeSession } from 'helpers/session'
import authApis from 'apis/auth'
import useAsyncFn from 'hooks/useAsyncFn'
import styles from './style.module.css'

const { useState } = React

const Sidebar = () => {
  const session = getSession()
  const isLogged = session && session.userId
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [logoutState, logoutFn] = useAsyncFn(authApis.logout)

  const handleNameClick = () => setShowLoginDialog(true)
  const handleLoginDialogClose = () => setShowLoginDialog(false)
  const handleLogout = async () => {
    // TODO: should removeSession after logoutFn()
    removeSession()
    await logoutFn()
  }

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {isLogged ? <img src={session.profile.avatarUrl} loading='lazy' /> : <Icon icon='person' />}
        </div>
        {isLogged ? (
          <Popover
            content={(
              <Menu>
                <MenuItem icon='log-out' text='退出登录' onClick={handleLogout} />
              </Menu>
            )}
            interactionKind='hover'
          >
            <div className={styles.name}>
              <span>{session.profile.nickname}</span>
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
