<script lang="ts" setup>
import { levels } from '@/store';
import { useGame } from './'
import { generateMap } from '@/utils';


const { initGame, win, cells } = useGame()



let current = 0
function startNextGame() {
	if (current < levels.length) {
		initGame(generateMap(levels[current]))
		current++
	}
}

startNextGame()



</script>

<template>
	<div class="app-container">
		<div class="game-container">
			<div class="mapContainer">
				<div v-for="(cell, rowIndex) in cells" :key="rowIndex" class="cellBlock" :class="cell.class"
					:style="cell.style">
				</div>
			</div>

			<text>
				{{ win ? 'clear' : 'playing' }}
			</text>
			<button v-if="win" @click="startNextGame">next</button>

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
