import { useLocation } from 'react-router-dom'

const useQuery = () => {
  const { search } = useLocation()
  const result: IDictionary<string> = {}

  search
    .substr(1)
    .split('&')
    .reduce((prev, curr) => {
      const [key, value] = curr.split('=')
      prev[key] = decodeURIComponent(value)
      return prev
    }, result)

  return result
}

export default useQuery
