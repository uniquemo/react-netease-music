import React from 'react'

import styles from './style.module.css'

interface IProps {
  title: string,
  words?: string[]
}

const Words: React.FC<IProps> = ({ title, words }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.words}>
        {words?.map(word => <span key={word} className={styles.word}>{word}</span>)}
      </div>
    </div>
  )
}

export default Words
