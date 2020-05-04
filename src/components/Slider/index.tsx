import React from 'react'
import { Slider, ISliderProps } from '@blueprintjs/core'

import styles from './style.module.css'

const MySlider: React.FC<ISliderProps> = (props) => {
  return (
    <Slider
      className={styles.root}
      intent='danger'
      {...props}
    />
  )
}

export default MySlider
