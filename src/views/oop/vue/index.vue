<script lang="ts" setup>

import { useSkobanVue } from './index'

const { win, renderDataComputed: cells, reset, next, hasNextLevel } = useSkobanVue()


</script>

<template>
	<div class="app-container">
		<button class="reset" @click="reset">reset</button>
		<div class="game-container">
			<div class="mapContainer">
				<div v-for="(cell, rowIndex) in cells" :key="rowIndex" class="cellBlock" :class="cell.class"
					:style="cell.style">
				</div>
			</div>

			<text class="text">
				{{ win ? 'clear' : 'playing' }}
			</text>
			<button v-if="win && hasNextLevel()" class="next" @click="next">next</button>


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
