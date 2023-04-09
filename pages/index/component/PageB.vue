<template>
	<view class="page-b">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<view class="custom-nav__back">
					<text class="tn-text-bold tn-text-xl tn-color-black">斗图列表</text>
				</view>
			</view>
		</tn-nav-bar>

		<view class="tn-classify__wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

			<!-- 搜索框 -->
			<!-- <view class="tn-classify__search--wrap" style="padding-bottom: 20rpx;">
				<view class="tn-color-gray--dark"
					style="margin: 20rpx 30rpx 0rpx 30rpx;border-radius: 100rpx;padding-left: 6rpx;background-color: rgba(248, 247, 248, 0.9);">
					<tn-notice-bar :list="searlist" mode="vertical" leftIconName="search" :duration="6000"></tn-notice-bar>
				</view>
			</view> -->
			<!-- 搜索框结束 -->

			<!-- 图片列表开始 -->
			<view class="emo-container">
				<template v-for="(item, index) in imageList">
					<view class="item-header" :index="index" @click="list(index)">
						<text class="item-title">{{ item.title }}</text>
						<text class="item-more-title">更多 ></text>
					</view>
					<view class="item-container" :index="index" @click="list(index)">
						<template v-for="(it ,ix) in (item.img)">
							<view class="item-image">
								<image :src="it.img_back" mode="scaleToFill" style="height: 100%;width: 100%;border-radius: 6rpx;"></image>
							</view>
						</template>
					</view>
				</template>
			</view>
			<!-- 图片列表结束 -->
		</view>
	</view>
	</view>
	</view>
</template>

<script>
	import { emoGroupList } from '@/utils/api/emo.js'
	export default {
		name: 'templateShopClassify',
		components: {
		},

		data() {
			return {
				searlist: [
					'凶姐精美壁纸',
					'情侣聊天背景',
					'热血动漫头像',
					'手机屏保壁纸'
				],
				imageList: [],
				searchWhere: {
					size: 20,
					title: "",
					page: 1,
				},
			}
		},
		created() {
			this.getEmoGroupList()
		},
		methods: {
			getEmoGroupList(){
				uni.showLoading({
					title: "数据努力加载中"
				})
				emoGroupList(this.searchWhere).then(res => {
					uni.hideLoading()
					if (res.items.length < 1) {
						this.$func.showToast('暂无新数据')
						return
					}
					this.imageList.push(...res.items)
					this.searchWhere.page = res.page + 1
					this.searchWhere.size = res.size
				})
			},
			list(index) {
				uni.navigateTo({
					url: '/pageA/emo/list?uid=' + this.imageList[index].uid
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.emo-container {
		margin: 8px 12px 0px 12px;
	}
	.item-container {
		display: flex;
		flex-direction: row;
		height: 160rpx;
		margin-bottom: 20rpx;
	}
	.item-header {
		height: 50rpx;
		line-height: 50rpx;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.item-title {
		font-size: 30rpx;
		color: #000;
	}
	.item-more-title {
		font-size: 20rpx;
		color: gray;
	}
	.item-image:not(:first-child) {
		margin-left: 1%;
	}
	.item-image {
		width: 24%;
		height: 100%;
	}
	.page-b {
		max-height: 100vh;
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 30rpx;
			margin-right: 10rpx;
			flex-basis: 5%;
			width: 100rpx;
			position: absolute;
		}
	}


	.left-width {
		flex-basis: 28%;
	}

	/* 自定义导航栏内容 end */
	.tn-classify {

		/* 搜索栏 start */
		&__search {
			&--wrap {}

			&__box {
				flex: 1;
				text-align: center;
				padding: 20rpx 30rpx;
				margin: 0 30rpx;
				border-radius: 60rpx;
				font-size: 30rpx;
			}

			&__icon {
				padding-right: 10rpx;
			}

			&__text {
				padding-right: 10rpx;
			}
		}

		/* 搜索栏 end */
	}
</style>