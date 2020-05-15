const serverEnv = process.env.NODE_ENV || 'development'
const serverAddr = serverEnv === 'development' ? 'localhost' : '47.115.57.59'

export const SERVER = `http://${serverAddr}:3000`
