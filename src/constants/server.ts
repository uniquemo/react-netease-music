const serverEnv = process.env.NODE_ENV || 'development'
const serverAddr = serverEnv === 'development' ? 'localhost:3000' : ''

export const SERVER = `http://${serverAddr}`
