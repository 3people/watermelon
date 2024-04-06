import * as crypto from 'crypto-js'

export const getGameId = () => {
  const current = new Date()
  const text = JSON.stringify(current)
  const encrypted = crypto.AES.encrypt(text, 'zzio-games-watermelon').toString()
  return encrypted
}
