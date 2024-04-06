// export const targetTime = new Date('2024-04-19T23:59:59+09:00')
export const targetTime = new Date('2024-04-06T18:39:59+09:00')

export const isEventOpen = () => {
  const current = new Date()
  return current < targetTime
}
