export interface IUser {
  anonym: number
  authStatus: number
  avatarUrl: string
  nickname: string
  userId: number
  userType: number
  vipType: number
}

export interface IReply {
  beRepliedCommentId: number
  content: string
  status: number
  user: IUser
}

export interface IComment {
  beReplied: IReply[]
  commentId: number
  commentLocationType: number
  content: string
  liked: boolean
  likedCount: number
  parentCommentId: number
  status: number
  time: number
  user: IUser
}
