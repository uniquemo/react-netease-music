import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import { noop } from 'helpers/fn'
import { PAGE, PAGE_SIZE, TOTAL } from 'constants/pagination'
import styles from './style.module.css'

interface IProps {
  total?: number,
  page?: number,
  pageSize?: number,
  onPageChange: (page: number) => void
}

const { useState } = React

const Pagination: React.FC<IProps> = ({ total = TOTAL, page = PAGE, pageSize = PAGE_SIZE, onPageChange = noop }) => {
  const [currentPage, setCurrentPage] = useState(page)
  const pageCount = Math.ceil(total / pageSize)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pageCount

  const handleItemClick = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const handlePrev = () => {
    if (isFirstPage) {
      return
    }

    handleItemClick(currentPage - 1)
  }

  const handleNext = () => {
    if (isLastPage) {
      return
    }

    handleItemClick(currentPage + 1)
  }

  const renderPages = () => {
    const result = []
    for (let i = 0; i < pageCount; i++) {
      const page = i + 1

      result.push(
        <div
          key={i}
          className={cn(styles.item, currentPage === page && styles.active)}
          onClick={() => handleItemClick(page)}
        >
          {i + 1}
        </div>
      )
    }
    return result
  }

  if (total < pageSize) {
    return null
  }

  return (
    <div className={styles.root}>
      <div className={cn(styles.item, isFirstPage && styles.disabled)} onClick={handlePrev}>
        <Icon icon='chevron-left' />
      </div>
      <div className={styles.pages}>{renderPages()}</div>
      <div className={cn(styles.item, isLastPage && styles.disabled)} onClick={handleNext}>
        <Icon icon='chevron-right' />
      </div>
    </div>
  )
}

export default Pagination
