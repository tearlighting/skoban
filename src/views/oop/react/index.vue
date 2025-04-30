<template>
	<div id="reactRoot"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, } from "vue";
import { mountReactComponent } from "./index"



let unmount: () => void;
onMounted(() => {
	unmount = mountReactComponent(document.getElementById("reactRoot"));
});

onBeforeUnmount(() => {
	unmount && unmount();
});
</script>
<style lang="less" scoped>
#reactRoot {
	width: 100%;
	height: 100vh;

	:deep(.app-container) {
		.mapContainer {
			height: 40vh;
			font-size: 16px;
			position: relative;
		}


	}
}
</style>
