const ROOT: string = '/'

const DISCOVERY: string = '/discovery'
const RECOMMENDATION: string = `${DISCOVERY}/recommendation`
const SONG_LIST: string = `${DISCOVERY}/songlist`
const LEADER_BOARD: string = `${DISCOVERY}/leaderboard`
const SINGERS: string = `${DISCOVERY}/singers`
const LATEST_MUSIC: string = `${DISCOVERY}/latestmusic`
const RECOMMEND_DAILY: string = `${DISCOVERY}/recommend_daily`

const VIDEOS: string = '/videos'
const VIDEO: string = `${VIDEOS}/video`
const MV: string = `${VIDEOS}/mv`

const SEARCH: string = '/search'

const SONG_LISTS: string = '/songlists'
const SONG_LIST_DETAIL: string = `${SONG_LISTS}/:songlistId`

const DOWNLOAD: string = '/download'
const CLOUD: string = '/cloud'
const COLLECTION: string = '/collection'

const DEFAULT_ROUTE: string = DISCOVERY

const ROUTES = {
  ROOT,
  DEFAULT_ROUTE,
  DISCOVERY,
  RECOMMENDATION,
  SONG_LIST,
  LEADER_BOARD,
  SINGERS,
  LATEST_MUSIC,
  RECOMMEND_DAILY,
  VIDEOS,
  VIDEO,
  MV,
  SEARCH,
  SONG_LISTS,
  SONG_LIST_DETAIL,
  DOWNLOAD,
  CLOUD,
  COLLECTION
}

export default ROUTES
