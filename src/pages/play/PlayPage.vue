<template>
  <ZHeader class="mt-3">
    <template v-slot:left>
      <BackButton @click="goBack" />
    </template>
    <Score :score="scoreRef" />
    <template v-slot:right>
      <Player :name="userStore.nickName" />
    </template>
  </ZHeader>
  <div class="relative flex-1">
    <div class="absolute -z-10 top-1/2 -translate-y-1/2 w-full">
      <img class="m-auto" alt="background" :src="playBackground" />
    </div>
    <next-block :next-index="nextBlockRef" class="pointer-events-none absolute top-6" />
    <canvas ref="canvas" class="w-full h-full" />
    <ground :height="groundHeightRef" />
  </div>
  <game-over
    v-if="gameOverRef"
    :score="scoreRef"
    :nickname="userStore.nickName"
    @replay="replay"
    @back="goBack"
    @rank="goRank"
  />
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NextBlock from './_components/NextBlock.vue'
import GameOver from './_components/GameOver.vue'
import Ground from './_components/Ground.vue'
import Score from './_components/Score.vue'
import { usePlayer } from '../../hooks/use-player.ts'
import ZHeader from '../../components/ZHeader.vue'
import BackButton from '../../components/button/BackButton.vue'
import { useRouter } from 'vue-router'
import Player from './_components/Player.vue'
import { useUserStore } from '../../stores/user.ts'
import playBackground from '../../assets/play-background.svg'

const userStore = useUserStore()
const router = useRouter()
const canvas = ref<HTMLCanvasElement>()

const { replay, nextBlockRef, groundHeightRef, gameOverRef, scoreRef } = usePlayer(canvas)

onMounted(() => {
  if (!userStore.nickName) {
    router.replace('/')
  }
  document.body.style.cssText = 'overflow: hidden; overscroll-behavior: none;'
})

onBeforeUnmount(() => {
  document.body.style.cssText = ''
})

// todo canvas 미지원 브라우저에 대하여 matter.js 대응 체크
// todo matter.js 하위 브라우저 대응 없을 시 canvas.getContext 함수 유무로 처리

const goBack = () => {
  router.back()
}

const goRank = () => {
  router.push('/rank')
}
</script>
