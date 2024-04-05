<template>
  <div>
    <input
      type="checkbox"
      v-model="modelValueRef"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="hidden"
      id="checkbox"
    />
    <label for="checkbox" class="cursor-pointer">
      <img v-if="modelValueRef" :src="checkboxActive" alt="checkbox active" />
      <img v-else :src="checkboxDefault" alt="checkbox default" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import checkboxDefault from '@/assets/checkbox-default.svg'
import checkboxActive from '@/assets/checkbox-active.svg'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const modelValueRef = toRef(props.modelValue)
</script>
