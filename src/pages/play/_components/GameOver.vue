<template>
  <privacy-term v-if="isPrivacyTermOpen" @close="togglePrivacyTerm" />
  <div
    v-else
    class="absolute inset-0 flex flex-col items-center justify-center z-50 bg-transBlack-50 px-6"
  >
    <div v-if="isEventOpen()" class="mb-2">
      <div :class="topBannerStyle">
        <div @click="toggleBanner('')" class="flex items-center justify-end">
          <div v-if="!isSuccess" class="text-banner-r mr-auto">
            <span>잠시만요!</span><br />
            <span class="text-banner-b">이벤트 참여하면 상품</span>
            <span>을 받을 수 있어요</span>
          </div>
          <div v-else class="text-banner-r mr-auto">
            <span class="text-banner-b">이벤트 참여 완료!</span><br />
            <span>결과 발표를 기다리찌오!</span>
          </div>
          <img :src="giftZzio" alt="gift zzio" />
          <img
            :src="arrow"
            alt="arrow"
            :class="[activeBanner === 'top' ? '' : 'rotate-180', 'h-6']"
          />
        </div>
      </div>
      <div
        v-if="activeBanner === 'top'"
        class="w-[340px] rounded-b-2xl border-2 border-black border-t-0 bg-light-green p-4"
      >
        <div class="flex flex-col items-center text-center">
          <img :src="eventTitle" alt="event title" class="w-[130px] h-[28px] mb-2" />
          <span class="text-caption-b">명예의 찌오당에 이름을 올리고 공식 굿즈 받아가세요!</span>
          <span class="text-caption-r">자세한 내용은 @zzzi_ori 에서 확인하세요 </span>
        </div>
        <div class="mt-4 text-body-b">
          <div>
            <label class="mb-2 block">닉네임</label>
            <z-input :disabled="true" :model-value="nickname" />
          </div>
          <div class="mt-4">
            <label class="mb-2 block">전화번호</label>
            <z-input
              v-model="phoneNumber"
              type="number"
              placeholder="번호를 입력해 주세요"
              :max="11"
            />
            <div class="mt-2 flex">
              <img :src="info" alt="info" class="mr-1" />
              <span class="text-caption-r text-dark-green">
                전화번호를 다시 한 번 확인해주세요.
              </span>
            </div>
          </div>
          <div class="mt-6 flex items-center">
            <z-checkbox v-model="isPrivacyPolicyAgreed" />
            <div class="ml-1 text-body-r">
              <strong class="text-body-b">[필수]</strong> 개인정보 수집, 이용동의
            </div>
            <div class="ml-auto cursor-pointer" @click="togglePrivacyTerm">보기</div>
          </div>
          <z-button class="mt-6" :disabled="!isFormFilled || isSuccess" @click="onClickSubmit">
            {{ buttonText }}
          </z-button>
        </div>
      </div>
    </div>
    <div
      class="w-[340px] bg-white flex flex-col gap-6 px-6 py-4 justify-center items-center rounded-2xl border-2 border-black"
    >
      <template v-if="activeBanner === 'bottom'">
        <img :src="gameOver" alt="game over" />
        <div class="text-body-b px-2 border-2 rounded">
          {{ nickname }}
        </div>
        <img :src="gameOverZzio" alt="zzio" />
      </template>
      <div @click="toggleBanner('bottom')" class="w-full text-body-r flex items-center">
        <div class="w-full">
          <div class="w-full flex justify-between">
            <span>점수</span>
            <div class="text-body-b flex gap-1">
              <span>{{ score }}</span>
              <img :src="coinSm" alt="코인" />
            </div>
          </div>
          <div v-if="isEventOpen()" class="w-full flex justify-between">
            <span>순위</span>
            <span class="text-body-b">{{ rank }}등 / {{ total }}명</span>
          </div>
        </div>
        <img v-if="activeBanner === 'top'" :src="arrow" alt="arrow" class="h-6 rotate-180 ml-7" />
      </div>
      <template v-if="activeBanner === 'bottom'">
        <div class="flex gap-4">
          <ZRoundButton :color="'secondary'" @click="$emit('back')" title="처음으로">
            <img :src="home" alt="홈" />
          </ZRoundButton>
          <ZRoundButton :color="'primary'" @click="$emit('replay')" title="다시하기">
            <img :src="replay" alt="다시하기" />
          </ZRoundButton>
        </div>
        <img
          v-if="isEventOpen()"
          class="max-w-72"
          :src="rankBanner"
          alt="실시간 랭킹 바로가기"
          @click="$emit('rank')"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import gameOver from '@/assets/game-over.svg'
import replay from '@/assets/replay.svg'
import home from '@/assets/home.svg'
import gameOverZzio from '@/assets/game-over-zzio.svg'
import ZRoundButton from '@/components/button/ZRoundButton.vue'
import rankBanner from '@/assets/rank-banner.png'
import coinSm from '@/assets/coin-sm.svg'
import giftZzio from '@/assets/gift-zzio.svg'
import arrow from '@/assets/arrow.svg'
import info from '@/assets/info.svg'
import { usePostEvent } from '@/requests/use/usePostEvent.ts'
import eventTitle from '@/assets/event-title.svg'
import { usePostRank } from '@/requests/use/usePostRank.ts'
import { computed, onMounted, ref } from 'vue'
import ZInput from '@/components/ZInput.vue'
import ZButton from '@/components/button/ZButton.vue'
import ZCheckbox from '@/components/ZCheckbox.vue'
import PrivacyTerm from '@/pages/play/_components/PrivacyTerm.vue'
import { getGameId } from '@/utils/get-game-id.ts'
import { isEventOpen } from '@/utils/check-event-open.ts'

const props = defineProps({
  nickname: {
    type: String,
    default: '',
  },
  score: {
    type: Number,
    default: 0,
  },
})

const { data, mutate } = usePostRank()
const { isSuccess, mutate: mutateEvent } = usePostEvent()

const rank = computed(() => data?.value?.rank)
const total = computed(() => data?.value?.count)
const userId = computed(() => data?.value?.userId)

const activeBanner = ref<string>('bottom')
const topBannerStyle = computed(() => [
  activeBanner.value === 'top' ? 'rounded-t-2xl' : 'rounded-2xl',
  'bg-gradient-to-r w-[340px] from-gradient-yellow to-gradient-pink px-4 py-2 border-2 border-black',
])

const phoneNumber = ref<string>('')
const isPrivacyPolicyAgreed = ref<boolean>(false)
const isFormFilled = computed(
  () => props.nickname && phoneNumber.value && isPrivacyPolicyAgreed.value,
)
const buttonText = computed(() => (isSuccess.value ? '제출 완료' : '제출하기'))

const isPrivacyTermOpen = ref<boolean>(false)

const toggleBanner = (position: string) => {
  if (position === '') {
    activeBanner.value = activeBanner.value === 'top' ? 'bottom' : 'top'
    return
  }
  activeBanner.value = position
}

const togglePrivacyTerm = () => {
  isPrivacyTermOpen.value = !isPrivacyTermOpen.value
}

const onClickSubmit = () => {
  if (userId.value) {
    mutateEvent({ userId: userId.value, phoneNumber: phoneNumber.value })
  }
}

onMounted(() => {
  // 이벤트 기간 지나지 않았을 경우 rank 등록
  if (props.score && props.nickname && isEventOpen()) {
    mutate({
      score: props.score,
      nickName: props.nickname,
      gameId: getGameId(),
    })
  }
})
</script>
