<template>
	<view class="search-box" :class="{left:isLeft}" @tap="toSearch">
		<icon size="20" type="search"></icon>
		<input @focus="isLeft=true" @blur="isLeft=false" type="text" value="" placeholder="搜索" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
					// 是否控制显示在左侧
					isLeft: false,
			}
		},
		methods:{
			toSearch(){
				// 编程式导航
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style lang='less'>
	.search-box {
		background-color: #fe2c4b;
		padding: 16rpx;
		position: relative;
	}
	input {
		background-color: white;
		border-radius: 10rpx;
		height: 68rpx;
		padding-left: 360rpx;
		// 延时 动画效果
		transition: .5s;
	}

	icon {
		position: absolute;
		left: 320rpx;
		top: 28rpx;
		transition: .5s;
	}

	.search-box.left {
		input {
			padding-left: 45rpx;
		}

		icon {
			left: 20rpx
		}
	}
</style>
