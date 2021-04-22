<template>
	<view class="home-container">
		<!-- 顶部搜索区域 -->
		<view class="search-box" :class="{left:isLeft}">
			<icon size="20" type="search"></icon>
			<input @focus="isLeft=true" @blur="isLeft=false" type="text" value="" placeholder="搜索" />
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key='item.goods_id'>
				<image :src="item.image_src" class="swiper-img"></image>
			</swiper-item>
		</swiper>
		<!-- nav导航区域 -->
		<view class="navBar">
			<navigation v-for="(item,index) in navList" :key='index'>
				<image :src="item.image_src"></image>
			</navigation>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-container">
			<view class="floor-item" v-for="(item,index) in floorList" :key='index'>
				<!-- 顶部 -->
				<image class="title-img" :src="item.floor_title.image_src"></image>
				<!-- 底部 -->
				<view class="bottom-box">
					<!-- 左侧图片 -->
					<view class="left">
						<image :src="item.product_list[0].image_src"></image>
					</view>
					<!-- 右侧图片 -->
					<view class="right">
						<template v-for="(item2,index2) in item.product_list" >
							<image v-if="index2!==0" :src="item2.image_src" :key='index2'></image>
						</template>
					</view>
				</view>
			</view>
		</view>
		<!-- 返回顶部 -->
		<view class="to-top" v-if='isShow' @tap='toTop'>
			<view>^</view>
			顶部
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			// 定义标记变量
			return {
				// 是否控制显示在左侧
				isLeft: false,
				// 轮播图图片列表
				swiperList: [],
				// 导航列表
				navList: [],
				// 楼层区域
				floorList: [],
				// 控制返回顶部按钮显示
				isShow: false
			}
		},
		// 调用接口
		onLoad() {
			// uni.request({
			// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			// 	method:'get'
			// }).then(res=>{
			// 	console.log(res)
			// 	this.swiperList=res[1].data.message
			// })
			// 获取轮播图数据
			this.$request({
				url: '/home/swiperdata',
				method: 'get'
			}).then(res => {
				this.swiperList = res.data.message
			})
			// 获取nav数据
			this.$request({
				url: '/home/catitems',
				method: "get"
			}).then(res => {
				this.navList = res.data.message
			})
			// 获取floor数据
			this.$request({
				url: '/home/floordata',
				method: "get"
			}).then(res => {
				console.log(res)
				this.floorList = res.data.message
			})
		},
				// 页面滚动监听事件
		onPageScroll(event) {
			if (event.scrollTop >= 200) {
				// 显示
				this.isShow = true
			} else {
				// 隐藏
				this.isShow = false
			}
		},
		methods:{
			toTop(){
				uni.pageScrollTo({
					scrollTop:0
				})
			}
		}
	}
</script>

<style lang="less">
	.home-container {
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

		.swiper-img {
			width: 100%;
		}

		.navBar {
			display: flex;
			align-items: center;
			height: 191rpx;

			navigation {
				flex: 1;
				text-align: center;

				image {
					width: 140rpx;
					height: 128rpx;
				}
			}
		}

		.floor-container {
			.floor-item {
				background-color: #f4f4f4;
			}

			.title-img {
				display: block;
				width: 100%;
				height: 88rpx;
			}

			.bottom-box {
				padding: 20rpx 17rpx;
				padding-right: 0;
				display: flex;

				image {
					width: 232rpx;
				}

				.left {
					image {
						height: 386rpx;
					}

					margin-right: 10rpx;
				}

				.right {
					image {
						height: 188rpx;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.to-top {
			width: 90rpx;
			height: 90rpx;
			text-align: center;
			display: flex;
			flex-direction: column;
			border-radius: 50%;
			background-color: #ccc;
			position: fixed;
			right: 17rpx;
			bottom: 40rpx;
			opacity: .5;
		}
	}
</style>
