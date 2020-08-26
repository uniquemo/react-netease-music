import React from 'react'
import cn from 'classnames'

import { noop } from 'helpers/fn'
import styles from './style.module.css'

interface ITab {
  label?: string
  key: string
  renderLabel?: () => React.ReactElement
  onClick?: (key: string) => void
}

interface IProps {
  tabs: ITab[]
}

const { useState } = React

const Tabs: React.FC<IProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0].key)

  return (
    <div className={styles.root}>
      {tabs.map(({ label, key, renderLabel, onClick = noop }) => {
        return (
          <div
            key={key}
            className={cn(styles.tab, activeTab === key && styles.active)}
            onClick={() => {
              setActiveTab(key)
              onClick(key)
            }}
          >
            {label || (renderLabel && renderLabel())}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
