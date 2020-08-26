import React from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

import styles from './style.module.css'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.middle}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
