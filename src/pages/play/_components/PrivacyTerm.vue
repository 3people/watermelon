<template>
  <div class="bg-white w-full h-full absolute inset-0 z-100">
    <ZHeader class="mt-3">
      <h1 class="text-body-b">개인정보 수집, 이용동의(필수)</h1>
      <template v-slot:right>
        <img :src="close" alt="닫기" @click="$emit('close')" class="w-8 h-8 cursor-pointer" />
      </template>
    </ZHeader>
    <div class="px-6 mt-5">
      <div class="text-dark-gray text-body-r">
        <p>
          개인정보보호법 제15조(개인정보의 수집, 이용) 및 22조(개인정보주체의 동의)에 의거하여
          개인정보 수집 및 이용하고자 합니다.
        </p>
        <p class="mt-4">
          개인정보보호법에 의거하여 개인정보 수집 및 이용에 따른 동의를 거부할 수 있으나, 동의를
          거부할 경우 이벤트 당첨 및 경품 발송이 제한됩니다.
        </p>
      </div>
      <table class="text-[#1E1E1E] border-collapse cell mt-6">
        <tr class="text-caption-b">
          <th class="cell head">수집항목</th>
          <th class="cell head">수집목적</th>
          <th class="cell head">보유기간</th>
        </tr>
        <tr class="text-caption-r">
          <td class="cell">[필수] 성명, 연락처, 개인정보 활용 동의</td>
          <td class="cell">이벤트 경품 발송을 위한 개인정보 수집</td>
          <td class="cell">이벤트 경품 발송 완료시까지</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import ZHeader from '../../../components/ZHeader.vue'
import close from '@/assets/close.svg'
</script>
<style scoped>
.cell {
  border-width: 1px;
  border-color: #dadee4;
  padding: 12px;
}

.head {
  background-color: #eef1f5;
}
</style>
