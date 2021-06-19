const LOCAL_ORIGIN = 'http://localhost'
const REMOTE_ORIGIN = 'http://www.uniquemo.cn'

export const SERVER = __LOCALHOST__ ? `${LOCAL_ORIGIN}:3000` : `${REMOTE_ORIGIN}/api`
export const GRAPHQL_SERVER = __LOCALHOST__ ? `${LOCAL_ORIGIN}:4000/graphql` : `${REMOTE_ORIGIN}/graphql`
