<script lang="ts" setup>
import { levels } from '@/store';
import { useGame } from './'
import { generateMap } from '@/utils';
import { onMounted } from 'vue';


const { initGame, win, cells } = useGame()



let current = 0
function startNextGame() {
	if (current < levels.length) {
		initGame(generateMap(levels[++current]))	
	}
}
onMounted(() => {
	initGame(generateMap(levels[current]))

})
function reset() {

	initGame(generateMap(levels[current]))

}


</script>

<template>
	<div class="app-container">
		<button @click="reset">reset</button>
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
