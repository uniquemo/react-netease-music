enum ORDER {
  HOT = 'hot',
  NEW = 'new',
}

export interface IGetSonglistsRequest {
  cat?: string
  order?: ORDER
  limit?: number
  offset?: number
}

export interface ICategory {
  activity: boolean
  category: number
  hot: boolean
  name: string
  type: number
}

export interface IGetSonglistCatsResponse {
  all: ICategory
  categories: IDictionary<string>
  sub: ICategory[]
}
