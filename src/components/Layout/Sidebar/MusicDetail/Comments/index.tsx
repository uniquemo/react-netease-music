import React from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import Pagination from 'components/Pagination'
import Comment from 'components/Comment'
import songApis from 'apis/song'
import commentApis from 'apis/comment'
import useAsyncFn from 'hooks/useAsyncFn'
import { PlayMusicStateContext } from 'reducers/playMusic'
import { PAGE } from 'constants/pagination'
import { IComment } from 'apis/types/comment'
import styles from './style.module.css'

const { useEffect, useContext, useState } = React

const PAGE_SIZE = 30

const Comments = () => {
  const [page, setPage] = useState(PAGE)

  const [state, getCommentsFn] = useAsyncFn(songApis.getComments)
  const { value: result, loading } = state

  const [, likeCommentFn] = useAsyncFn(commentApis.likeComment)
  const [, unlikeCommentFn] = useAsyncFn(commentApis.unlikeComment)

  const playState = useContext(PlayMusicStateContext)
  const { musicId, showLyric } = playState

  useEffect(() => {
    if (musicId && showLyric) {
      getCommentsFn({
        id: musicId,
        offset: 0,
        limit: PAGE_SIZE,
      })
    }
  }, [musicId, showLyric])

  const handlePageChange = (page: number) => {
    setPage(page)
    getCommentsFn({
      id: musicId,
      offset: (page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
    })
  }

  const handleLikeChange = async (comment: IComment, isHot: boolean) => {
    const comments = (isHot ? result?.hotComments : result?.comments) || []
    const { commentId, liked } = comment
    const cm = comments.find(({ commentId: cid }) => cid === commentId) as IComment

    if (liked) {
      await unlikeCommentFn({ id: musicId, commentId }, () => {
        cm.liked = false
        cm.likedCount -= 1
      })
      return
    }

    await likeCommentFn({ id: musicId, commentId }, () => {
      cm.liked = true
      cm.likedCount += 1
    })
  }

  return (
    <div className={styles.root}>
      {loading ? (
        <div className={styles.block}>
          <div className={styles.title}>最新评论</div>
          <div className={styles.loading}>
            <Spinner className='spinner' size={Spinner.SIZE_SMALL} />
          </div>
        </div>
      ) : (
        <>
          {!!result?.hotComments?.length && (
            <div className={styles.block}>
              <div className={styles.title}>精彩评论</div>
              <div className={styles.comments}>
                {result?.hotComments.map((item) => {
                  return (
                    <div className={styles.item} key={item.commentId}>
                      <Comment data={item} onLikeChange={(item) => handleLikeChange(item, true)} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className={cn(styles.block, styles.latestComment)}>
            <div className={styles.title}>最新评论（{result?.total || 0}）</div>
            <div className={styles.comments}>
              {result?.comments.map((item) => {
                return (
                  <div className={styles.item} key={item.commentId}>
                    <Comment data={item} onLikeChange={(item) => handleLikeChange(item, false)} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.pagination}>
            <Pagination page={page} pageSize={PAGE_SIZE} total={result?.total} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  )
}

export default Comments
