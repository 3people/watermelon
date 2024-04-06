<template>
  <a href="https://www.instagram.com/p/C5anjFMP-9n/?utm_source=ig_web_copy_link" target="_blank">
    <Counter class="mt-3" />
  </a>
  <div class="flex flex-col flex-1 justify-center items-center px-6">
    <img :src="zzioGame" alt="zzio game" class="mt-6" />
    <img :src="title" alt="황금 찌오를 찾아라 beta" class="my-3" />
    <img :src="illustration" alt="찌오 이미지" class="mb-6" />
    <div class="w-full flex text-caption-r text-dark-green mb-2">
      <img :src="info" alt="info" class="mr-[2px]" />
      <span>{{ isOpenRef ? '랭킹에 올라갈 ' : '' }}닉네임을 8자 이내로 적으찌오</span>
    </div>
    <ZInput v-model="userStore.nickName" />
    <ZButton @click="onClickPlay" color="primary" :disabled="!userStore.nickName" class="mt-2">
      게임 시작
    </ZButton>
    <ZButton v-if="isOpenRef" @click="onClickRank" color="secondary" :disabled="false" class="mt-6">
      실시간 랭킹
    </ZButton>
    <Notice :closed="!isOpenRef" />
  </div>
  <Footer />
</template>
<script setup lang="ts">
import zzioGame from '../../assets/zzio-game.svg'
import title from '../../assets/title.svg'
import info from '../../assets/info.svg'
import illustration from '../../assets/illustration.svg'
import ZButton from '../../components/button/ZButton.vue'
import Footer from '../../components/Footer.vue'
import { onMounted, ref } from 'vue'
import Notice from './_components/Notice.vue'
import ZInput from '../../components/ZInput.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user.ts'
import Counter from './_components/Counter.vue'
import { isEventOpen } from '@/utils/check-event-open.ts'

const router = useRouter()
const userStore = useUserStore()

const isOpenRef = ref<boolean>(isEventOpen())

onMounted(() => {
  const interval = setInterval(() => {
    isOpenRef.value = isEventOpen()
  }, 1000)
  return () => clearInterval(interval)
})

const onClickPlay = () => {
  router.push('/play')
}

const onClickRank = () => {
  router.push('/rank')
}
</script>
