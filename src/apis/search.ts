import axios from 'helpers/axios'
import { ISearchHot, ISearchSuggestRequest, ISearchSuggestResponse } from './types/search'

type SearchHotFn = () => Promise<ISearchHot[]>
type SearchSuggestFn = (params: ISearchSuggestRequest) => Promise<ISearchSuggestResponse>

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

export default {
  searchHot,
  searchSuggest
}
