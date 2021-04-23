<template>
	<view class="search-container">
		<!-- 搜索框 -->
		<view class="search-box">
			<icon class="searchIcon" type="search"></icon>
			<input type="text" @confirm="search" v-model="query" placeholder="请输入你想要的商品" />
			<button v-show="query" @tap="clear" type="default">取消</button>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box">
			<view class="top">
				<text>历史搜索</text>
				<icon type="clear" @tap="clearHistoryList"></icon>
			</view>
			<view class="items">
				<view class="item" v-for="(item,index) in historyList" :key='index'>{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 双向绑定的值
				query: '',
				// 保存历史数据的数组
				historyList: []
			}
		},
		methods: {
			clear() {
				// 清空数据
				this.query = ''
			},
			search() {
				// 非空判断
				if (this.query) {
					// 不能重复
					if (!this.historyList.includes(this.query)) {
						// 只添加不存在的
						this.historyList.unshift(this.query)
					}
					// 且长度不能大于十
					if (this.historyList.length > 9) {
						this.historyList.splice(9)
					}
				} else {
					// 如果为空
					uni.showToast({
						title: '内容不能为空',
						icon: 'none'
					})
				}
			},
			// 清空历史记录
			clearHistoryList() {
				this.historyList = []
				uni.showToast({
					title:'清空成功'
				})
			}
		},
		onLoad() {
			// 读取历史数据
			let res = uni.getStorageSync('info')
			this.historyList = res
		},
		watch:{
			historyList:{
				// 可访问堆中的数据
				deep:true,
				handler:function(newVal,oldVal){
					// 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
					uni.setStorageSync('info',newVal)
				}
			}
		}
	}
</script>

<style lang='less'>
	.search-container {
		.search-box {
			display: flex;
			padding: 20rpx;
			align-items: center;
			background-color: #eeeeee;
			position: relative;

			.searchIcon {
				font-size: 24rpx;
				position: absolute;
				left: 35rpx;
			}

			input {
				padding: 0 75rpx;
				background-color: #fff;
				height: 80rpx;
				width: 430rpx;

			}

			button {
				font-size: 35rpx;
				text-align: center;
				position: absolute;
				background-color: #eeeeee;
				right: 10rpx;
			}
		}

		.history-box {
			padding: 25rpx 20rpx 0 20rpx;

			.top {
				display: flex;
				justify-content: space-between;
			}

			.items {
				display: flex;
				/* 允许换行 */
				flex-wrap: wrap;
				margin-top: 30rpx;

				.item {
					background-color: #ddd;
					padding: 15rpx 20rpx;
					margin-right: 30rpx;
					margin-bottom: 15rpx;
				}
			}
		}
	}
</style>
