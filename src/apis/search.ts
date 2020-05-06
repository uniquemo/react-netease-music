import axios from 'helpers/axios'
import { ISearchHot, ISearchSuggestRequest, ISearchSuggestResponse, ISearchRequest, SEARCH_TYPE } from './types/search'

type SearchHotFn = () => Promise<ISearchHot[]>
type SearchSuggestFn = (params: ISearchSuggestRequest) => Promise<ISearchSuggestResponse>
type SearchFn = (params: ISearchRequest) => Promise<any>

const searchHot: SearchHotFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/search/hot'
  })

  return response?.result?.hots
}

const searchSuggest: SearchSuggestFn = async ({ keywords }) => {
  const response = await axios({
    method: 'get',
    url: '/search/suggest',
    params: {
      keywords
    }
  })

  return response.result
}

const search: SearchFn = async ({ keywords, type = SEARCH_TYPE.MUSIC, limit = 30, offset = 0 }) => {
  const response = await axios({
    method: 'get',
    url: '/search',
    params: {
      keywords,
      type,
      limit,
      offset
    }
  })

  return response.result
}

export default {
  searchHot,
  searchSuggest,
  search
}
