import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import { noop } from 'helpers/fn'
import { PAGE, PAGE_SIZE, TOTAL } from 'constants/pagination'
import styles from './style.module.css'

// 1~5正常+后3，n-5~n正常+前3，其他前3+后3，最多全部显示10页

interface IProps {
  total?: number
  page?: number
  pageSize?: number
  onPageChange: (page: number) => void
}

const { useState } = React
const MAX_SHOW_PAGE_COUNT = 10
const PAGE_LEFT_BORDER = 5
const PAGE_SCALE = 3

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

  const createPageItem = (page: number | string = ''): JSX.Element => {
    const isNumber = typeof page === 'number'
    return (
      <div
        key={page}
        className={cn(styles.item, currentPage === page && styles.active, !isNumber && styles.dotItem)}
        onClick={!isNumber ? noop : () => handleItemClick(page as number)}
      >
        {isNumber ? page : '...'}
      </div>
    )
  }

  const createContinuousPageItems = (start: number, end: number) => {
    const pages: JSX.Element[] = []
    for (let i = start; i <= end; i++) {
      const pageItem = createPageItem(i)
      pages.push(pageItem)
    }
    return pages
  }

  const createPages = (elements: (JSX.Element | JSX.Element[])[]) => {
    let result: JSX.Element[] = []
    elements.forEach((item) => {
      const temp = Array.isArray(item) ? item : [item]
      result = [...result, ...temp]
    })
    return result
  }

  const renderPages = () => {
    let result: JSX.Element[] = []

    if (pageCount <= MAX_SHOW_PAGE_COUNT) {
      result = createContinuousPageItems(1, pageCount)
      return result
    }

    const KEY = {
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    }

    const firstPage = createPageItem(PAGE)
    const lastPage = createPageItem(pageCount)
    const leftDot = createPageItem(KEY.LEFT)
    const rightDot = createPageItem(KEY.RIGHT)
    const PAGE_RIGHT_BORDER = pageCount - PAGE_LEFT_BORDER + 1

    if (currentPage <= PAGE_LEFT_BORDER) {
      result = createPages([firstPage, createContinuousPageItems(2, PAGE_LEFT_BORDER + PAGE_SCALE), rightDot, lastPage])
    } else if (currentPage >= PAGE_RIGHT_BORDER) {
      result = createPages([firstPage, leftDot, createContinuousPageItems(PAGE_RIGHT_BORDER - PAGE_SCALE, pageCount)])
    } else {
      result = createPages([
        firstPage,
        leftDot,
        createContinuousPageItems(currentPage - PAGE_SCALE, currentPage + PAGE_SCALE),
        rightDot,
        lastPage,
      ])
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
