/*
 * @param count 몇 번째 블럭인지
 */
export const getBlockIndex = (count: number) => {
  const _count = count > 6 ? 6 : count
  return Math.floor(Math.random() * (_count - 1)) + 1 // 1 ~ count
}
