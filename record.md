# 创建项目

官网 https://vite.dev/guide/

```ts
pnpm create vite
```

# 项目观察

## 目录

## 写法

```ts 兼容vue2

	data() {
		return {
			a: 1
		}
	},
	methods: {
		add() {
			this.a++
		}
	},

```

```ts vue3

	setup() {
		const a = ref(1)
		const add = () => {
			a.value++
		}
		return {
			a,
			add
		}
	}
```

```ts vue3 语法糖
 <script lang="ts" setup>

import { ref } from 'vue'

const a = ref(1)
const add = () => {
	a.value++
}
</script>
```

# vue 的本质

```ts tsx为例
npm install @vue/babel-plugin-jsx -D

{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```

# MVVM 编程方式

### OOP(Oriented Object Programming)

### functional Programming
