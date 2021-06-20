const LOCAL_ORIGIN = 'http://localhost'
const REMOTE_ORIGIN = 'http://www.uniquemo.cn'

export const PORT = 8080

export const SERVER = __LOCALHOST__ ? `${LOCAL_ORIGIN}:${PORT}/api` : `${REMOTE_ORIGIN}/api`
export const GRAPHQL_SERVER = __LOCALHOST__ ? `${LOCAL_ORIGIN}:${PORT}/graphql` : `${REMOTE_ORIGIN}/graphql`
