<script lang="ts" setup>


import FComponent from './tsxTemplate'











</script>

<template>
	<div class="app-container">
		<!-- <div class="mapContainer">
			<div v-for="(cell, rowIndex) in cells" :key="rowIndex" class="cellBlock" :class="cell.class"
				:style="cell.style">
			</div>
		</div>
		<div>
			{{ win ? 'congratulations' : '' }}
		</div> -->
		<FComponent />
	</div>
</template>

<style lang="less" scoped>
.app-container {
	&>div {

		:deep(.mapContainer) {
			height: 40vh;
			font-size: 16px;
			position: relative;


		}
	}
}
</style>
