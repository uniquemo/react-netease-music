const ROOT = '/'

const DISCOVERY = '/discovery'
const RECOMMENDATION = `${DISCOVERY}/recommendation`
const SONG_LIST = `${DISCOVERY}/songlist`
const LEADER_BOARD = `${DISCOVERY}/leaderboard`
const SINGERS = `${DISCOVERY}/singers`
const LATEST_MUSIC = `${DISCOVERY}/latestmusic`
const RECOMMEND_DAILY = `${DISCOVERY}/recommend_daily`

const VIDEOS = '/videos'
const VIDEO = `${VIDEOS}/video`
const MV = `${VIDEOS}/mv`

const SEARCH = '/search'

const SONG_LISTS = '/songlists'
const SONG_LIST_DETAIL = `${SONG_LISTS}/:songlistId`

const DOWNLOAD = '/download'
const CLOUD = '/cloud'
const COLLECTION = '/collection'

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
  COLLECTION,
}

export default ROUTES
