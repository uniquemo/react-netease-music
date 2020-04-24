import React from 'react'
import { Dialog, InputGroup, Button, IDialogProps } from '@blueprintjs/core'

import styles from './style.module.css'

const LoginDialog: React.FC<IDialogProps> = ({ isOpen, onClose }) => {
  const handleLogin = () => {
    console.log('login')
  }

  return (
    <Dialog
      style={{ width: '400px' }}
      title='登录'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.content}>
        <InputGroup
          placeholder='请输入手机号'
          leftIcon='mobile-phone'
        />
        <InputGroup
          placeholder='请输入密码'
          leftIcon='lock'
          type='password'
        />

        <div className={styles.loginBtn}>
          <Button onClick={handleLogin}>登录</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default LoginDialog
