import React, { ReactElement } from 'react'

import styles from './style.module.css'

export interface IColumn<RecordType, Key extends keyof RecordType> {
  title?: string,
  key: Key,
  width?: string,
  render: (value: any, record: RecordType, index?: number) => string | ReactElement
}

interface IProps<RecordType> {
  columns: IColumn<RecordType, keyof RecordType>[],
  data: RecordType[]
}

function Table<RecordType extends object = any>({ columns, data }: IProps<RecordType>) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {columns.map(({ title, width }, index) => {
          return <div key={index} style={{ width }}>{title}</div>
        })}
      </div>
      <div className={styles.content}>
        {data?.map((item, index) => {
          return <div className={styles.row} key={index}>
            {columns.map(({ key, width, render }, idx) => {
              return (
                <div
                  key={idx}
                  style={{ width }}
                >
                  {render(item[key], item, index)}
                </div>
              )
            })}
          </div>
        })}
      </div>
    </div>
  )
}

export default Table
