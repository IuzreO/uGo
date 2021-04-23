<template>
	<view class="cate.container">
		<!-- 顶部搜索栏 -->
		<searchBar></searchBar>
		<!-- 左右滚动区域 -->
		<view class="bottom-box">
			<scroll-view class="left" scroll-y="true" :scroll-top="activeIndex*50" scroll-with-animation>
				<view class="nav-item" :class="{active:index===activeIndex}" v-for="(item,index) in cateList"
					:key='item.cat_id' @tap="setActive(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view class="right" scroll-y="true">
				<!-- 顶部图片 -->
				<image src="../../static/images/titleImage.png" class="title-img"></image>
				<!-- 主体区域 -->
				<view class="section" v-for="item in cateList[activeIndex].children" :key='item.cat_id'>
					<view class="title">
						<text>{{item.cat_name}}</text>
					</view>
					<view class="section-items">
						<view class="item" v-for="item2 in item.children" :key='item2.cat_id'>
							<image :src="item2.cat_icon" mode=""></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	import searchBar from '../../components/searchBar.vue'
	export default {
		data() {
			return {
				// 分类数据
				cateList: [],
				// 高亮下标
				activeIndex: 0
			}
		},
		components: {
			searchBar
		},
		onLoad() {
			// 获取分类数据
			this.$request({
				url: '/categories',
				method: 'get'
			}).then(res => {
				console.log(res)
				this.cateList = res.data.message
			})
		},
		methods: {
			setActive(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang='less'>
	.cate.container {
		/* 保持和屏幕一样高 */
		height: 100vh;
		position: relative;

		.bottom-box {
			display: flex;
			position: absolute;
			top: 92rpx;
			bottom: 0;

			.left {
				.nav-item {
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					background-color: #f4f4f4;
					padding: 0 5rpx;

					&.active {
						background-color: white;
						position: relative;

						&::before {
							content: '';
							position: absolute;
							width: 8rpx;
							height: 60rpx;
							left: 0;
							top: 20rpx;
							background-color: #eb4450;
						}
					}
				}
			}

			.right {
				padding: 20rpx 16rpx;

				.title-img {
					width: 560rpx;
					height: 180rpx;
				}

				.section {
					.title {
						text-align: center;
						color: #e0e0e0;
						height: 110rpx;
						line-height: 110rpx;
					}

					text {
						color: black;
						margin: 0 30rpx;
					}
				}

				.section-items {
					display: flex;
					/* 允许换行 */
					flex-wrap: wrap;
				}

				.item {
					text-align: center;
					width: 33.33%;

					image {
						height: 120rpx;
						width: 120rpx;
					}

					text {
						display: block;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
