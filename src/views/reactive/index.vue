<script lang="ts">

// import { useAddA } from './useAddA'
// const { a, addA: add } = useAddA()
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'reactive',
	// data() {
	// 	return {
	// 		a: 0
	// 	}
	// },
	// methods: {
	// 	add() {
	// 		this.a++
	// 		// const b = 0
	// 	}
	// },
	setup() {
		const a = ref(0)
		const add = () => {
			a.value++
		}

		return {
			a,
			add
		}
	}
})

</script>


<template>
	<div>{{ a }}</div>
	<button @click="add">增加</button>
</template>

<style scoped lang="less"></style>
