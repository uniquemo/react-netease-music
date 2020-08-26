import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import { IComment } from 'apis/types/comment'
import { formatDatetime } from 'helpers/time'
import styles from './style.module.css'

interface IProps {
  data: IComment
  onLikeChange: (comment: IComment) => void
}

const Comment: React.FC<IProps> = ({ data, onLikeChange }) => {
  const { user, content, beReplied, time, likedCount, liked } = data

  const likeUnlike = async () => {
    await onLikeChange(data)
  }

  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        <img src={`${user.avatarUrl}?param=35y35`} loading='lazy' />
      </div>

      <div className={styles.info}>
        <div className={styles.comment}>
          <span className={styles.nickname}>{user.nickname}: </span>
          <span>{content}</span>
        </div>

        <div className={styles.reply}>
          {beReplied.map(({ content, user }, index) => {
            return (
              <div className={styles.item} key={index}>
                <span className={styles.nickname}>{user.nickname}: </span>
                <span>{content}</span>
              </div>
            )
          })}
        </div>

        <div className={styles.others}>
          <div className={styles.time}>{formatDatetime(time, true)}</div>
          <div className={styles.operations}>
            <div className={cn(styles.like, liked && 'active')} onClick={likeUnlike}>
              <Icon icon='thumbs-up' iconSize={14} />
              &nbsp;
              {!!likedCount && <span>{likedCount}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
