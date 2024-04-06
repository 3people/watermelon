<template>
  <input
    v-if="type === 'number'"
    type="number"
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    :class="style({ filled, disabled })"
    :maxlength="max"
    :disabled="disabled"
  />
  <input
    v-else
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    :class="style({ filled, disabled })"
    :maxlength="max"
    :disabled="disabled"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'

const props = defineProps({
  type: { type: String, default: 'text' },
  max: { type: Number, default: 8 },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '닉네임을 입력하세요' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:model-value'])

const filled = computed(() => props.modelValue.length > 0)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.replace(/^\s*/, '').slice(0, props.max)
  emit('update:model-value', target.value)
}

const style = cva(
  ['w-full text-body-b text-center p-4', 'rounded-[8px] px-[16px] py-[12px] border-2'],
  {
    variants: {
      filled: {
        true: '',
        false: 'border-dark-green',
      },
      disabled: {
        true: 'bg-[#D4FFE6] border-dark-green text-dark-gray',
        false: 'border-black',
      },
    },
  },
)
</script>
