import { ref } from "vue"

export function useAddA() {
  const a = ref(0)
  const addA = () => {
    a.value++
  }
  return {
    a,
    addA,
  }
}
