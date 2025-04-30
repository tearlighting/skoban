<script lang="ts" setup>
import { onMounted } from "vue";
import { useSkobanDom } from "./index"
onMounted(() => {
	useSkobanDom()
})

</script>

<template>
	<div class="app-container">
		<button class="reset">reset</button>
		<div class="game-container">
			<div class="mapContainer">

			</div>

			<text class="text">
				text
			</text>
			<button class="next">next</button>


		</div>


	</div>
</template>

<style lang="less" scoped>
.app-container {
	.mapContainer {
		height: 40vh;
		font-size: 16px;
		position: relative;
	}


}
</style>
