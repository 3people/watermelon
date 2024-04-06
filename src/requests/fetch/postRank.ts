import { zaxios } from '../zaxios.ts'

export interface PostRankParams {
  nickName: string
  score: number
  gameId: string
}

export interface PostRankResult {
  userId: number
  rank: number
  count: number
  currentTime: number
}

export const postRank = async (params: PostRankParams): Promise<PostRankResult> => {
  const response = await zaxios.post('/rank', params)
  return response.data
}
