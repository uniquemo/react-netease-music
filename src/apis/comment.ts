import axios from 'helpers/axios'

enum COMMENT_TYPE {
  MUSIC = 0,
  MV = 1,
  SONGLIST = 2,
  ALBUM = 3,
  RADIO_STATION = 4,
  VIDEO = 5,
}

interface ILikeUnlikeCommentRequest {
  likeOrUnlike: number
  type?: COMMENT_TYPE
  id: number
  commentId: number
}

type Params = Omit<ILikeUnlikeCommentRequest, 'likeOrUnlike'>

type LikeUnlikeCommentFn = (params: ILikeUnlikeCommentRequest) => Promise<any>
type LikeCommentFn = (params: Params, callback?: () => void) => Promise<any>
type UnlikeCommentFn = (params: Params, callback?: () => void) => Promise<any>

const likeUnlikeComment: LikeUnlikeCommentFn = async ({ likeOrUnlike, type, id, commentId }) => {
  const response = await axios({
    url: '/comment/like',
    params: {
      id,
      type,
      t: likeOrUnlike,
      cid: commentId,
    },
  })
  return response
}

const likeComment: LikeCommentFn = async ({ id, commentId, type = COMMENT_TYPE.MUSIC }) => {
  const response = await likeUnlikeComment({
    likeOrUnlike: 1,
    type,
    id,
    commentId,
  })
  return response
}

const unlikeComment: UnlikeCommentFn = async ({ id, commentId, type = COMMENT_TYPE.MUSIC }) => {
  const response = await likeUnlikeComment({
    likeOrUnlike: 2,
    type,
    id,
    commentId,
  })
  return response
}

export default {
  likeUnlikeComment,
  likeComment,
  unlikeComment,
}
