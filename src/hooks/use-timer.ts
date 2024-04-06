import { ref } from 'vue'

export const useTimer = (limit: number, callback: () => void) => {
  const count = ref<undefined | number>(undefined)
  let interval: undefined | number = undefined

  const clear = () => {
    if (interval) {
      clearInterval(interval)
      interval = undefined
    }
  }

  const start = () => {
    if (interval) {
      return
    }
    count.value = limit
    interval = setInterval(() => {
      if (count.value) {
        count.value = count.value - 1
      }
      if (count.value === 0) {
        clear()
        callback()
      }
    }, 1000)
  }

  const reset = () => {
    count.value = undefined
    clear()
  }

  return { count, reset, start }
}
