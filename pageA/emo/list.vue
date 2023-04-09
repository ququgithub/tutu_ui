<template>
	<view style="width: 100vw;padding-bottom: env(safe-area-inset-bottom);">
		<view style="position: sticky;top: 0;background: #FFF;">
			<view class="header">
				<view class="poster-bg" :style="{'background-image': 'url('+emoList[current]['img_back']+')'}"></view>
				<view class="header-pic">
					<image :showMenuByLongpress="false" errorIcon="photo" height="440rpx" radius="6" mode="aspectFit" :src="emoList[current]['img_back']" width="440rpx"></image>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view style="background: #FFF;height: 110rpx;border-radius: 50rpx;">
				<view class="btns">
					<view class="aaa" style="width:calc(100% / 5)" @click="back()">
						<text class="tn-icon-revoke" style="margin-bottom: 10rpx;font-size: 30rpx;"></text>
						<text>返回</text>
					</view>
					<view class="aaa" style="width:calc(100% / 5)" @click="download()">
						<text class="tn-icon-download" style="margin-bottom: 10rpx;font-size: 30rpx;"></text>
						<text>下载</text>
					</view>
					<view class="aaa" style="width:calc(100% / 5)">
						<text class="tn-icon-edit-write" style="margin-bottom: 10rpx;font-size: 30rpx;"></text>
						<text>改图</text>
					</view>
					<view class="aaa" style="width:calc(100% / 5)" @click="clickLike()">
						<text class="tn-icon-star" style="margin-bottom: 10rpx;font-size: 30rpx;"></text>
						<text>收藏</text>
					</view>
					<view class="aaa" style="width:calc(100% / 5)" @click="shareImage()">
						<text class="tn-icon-send" style="margin-bottom: 10rpx;font-size: 30rpx;"></text>
						<text>分享</text>
					</view>
					<!-- <button class="aaa u-reset-button" style="width:calc(100% / 5)" open-type="share">
						<text class="tn-icon-send" style="margin-bottom: 10rpx;font-size: 30rpx;"></text>
						<text>分享</text>
					</button> -->
				</view>
			</view>
			
			<scroll-view class="scroll-view" :scrollY="true" style="height: 50vh;" @scrolltolower="getImageList">
				<view class="container" v-if="isShowContainer">
					<view  style="width: 100%;height: 100%;">
						<view class="image-list">
							<view class="image" @click="clickImage(item, index)" v-for="(item, index) in emoList" :key="index" :class="current == index ? 'active' : ''">
								<image :src="item.img_back"  lazy-load="true" style="height: 100%;width: 100%;border-radius: 6rpx;"></image>
							</view>
						</view>
						<tn-read-more ref="readMore" openText="付费后解锁剩余内容"></tn-read-more>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { emoGroupList, emoImageList } from '@/utils/api/emo.js'
	export default {
		data() {
			return {
				title: '快搜表情',
				current: 0,
				emoList: [],
				searchWhere: {
					page: 1,
					size: 24,
					group_uid: ''
				},
				isShowContainer: true,
			}
		},
		onLoad(option) {
			this.searchWhere.group_uid = option.uid || ''
			this.getImageList()
		},
		computed: {
			
		},
		onReady() {
			this.$nextTick(() => {
				this.$refs.readMore.init()
			})
		},
		methods: {
			shareImage() {
				this.$func.shareImage(this.emoList[this.current].img_back)
			},
			download() {
				this.$func.downloadImage(this.emoList[this.current].img_back)
			},
			back() {
				uni.navigateBack()
			},
			getImageList() {
				uni.showLoading({
					title: '努力加载中'
				})
				emoImageList(this.searchWhere).then(res => {
					if (res.items.length > 0) {
						this.emoList.push(...res.items)
						this.searchWhere.page = res.page + 1
						this.searchWhere.size = res.size
					} else {
						this.$func.showToast('暂无新数据')
					}
					uni.hideLoading()
				})
			},
			clickImage(item,index) {
				this.current = index
			},
		}
	}
</script>

<style lang="scss" scoped>
	.image-list {
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	.image {
		width: 24%;
		height: 100%;
		margin-bottom: 20rpx;
	}
	.image:not(:first-child) {
		margin-left: 1%;
	}
	.u-reset-button {
		padding: 0;
		font-size: inherit;
		line-height: inherit;
		background-color: initial;
		color: inherit;
	}
	
	.u-reset-button::after {
		border: none;
	}
	.scroll-view {
	    white-space: nowrap;
		padding-bottom: env(safe-area-inset-bottom)
	}
	
	.wty-more {
	    display: flex;
	    align-items: center;
	    font-size: 20rpx;
	    color: #868484;
	}
	
	.two-btn {
		width:130rpx;
	}
	
	.header {
	    position: relative;
		overflow: hidden;
		height: 45vh;
	}
	
	.poster-bg, .header::after{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.header::after{
		content: '';
		background-color: rgba(0,0,0, .3);
	}
	
	.poster-bg{
	    filter: blur(20rpx);
	    background-size: cover;
	    background-position: center;
	    transition: background .3s ease-in-out;
	}
	
	.header-pic {
	    width: 100%;
	    height: 90%;
	    z-index: 2;
	    position: absolute;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	
	.content {
		background: #ffffff;
		margin-top: -40rpx;
		position: relative;
		border-radius: 50rpx;
		height: 55vh;
	}
	
	.btns {
		width: 90%;
		background: #000;
		opacity: 0.5;
		margin-left: 5%;
		top: 10rpx;
		height: 90rpx;
		position: relative;
		border-radius: 25px;
		display: flex;
		
		font-size: 24rpx;
		color: #FFF;
		
		.aaa {
			place-items: center;
			place-content: center;
			display: grid;
			line-height: 1;
		}
	}
	
	.desc {
		font-size: 24rpx;
		margin-top: 5rpx;
		display: flex;
		place-items: center;
		
		.nick-name {
			margin-left: 10rpx;
		}
	}
	
	.button {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: #555;
	}
	
	.header-btn {
		width: 85%;
	}
	
	.header-btn-val {
	    display: flex;
	    justify-content: flex-start;
	    padding-left: 70rpx;
		background: #FFF;
		height: 30px;
		border-radius: 25px;
		line-height: 30px;
	}
	
	.container {
	    display: flex;
	    flex-wrap: wrap;
	    padding: 30rpx 22rpx 0;
	    border-bottom: 20rpx solid #f5f6f7;
	}
	
	.picture {
	    position: relative;
	    width: calc(100% / 4);
	    padding: 0 8rpx;
	    margin-bottom: 16rpx;
	    box-sizing: border-box;
	}
	
	.active {
	    border: 1px solid #f9db61;
			opacity: 1;
	}
	
	.active .border-checkbox {
	    opacity: 1;
	}
	
	.border-checkbox {
	    font-size: 22rpx;
	    position: absolute;
	    bottom: 0;
	    right: 0;
	    width: 34rpx;
	    height: 34rpx;
	    padding-right: 2rpx;
	    text-align: right;
	    line-height: 38rpx;
	    border-radius: 20rpx 0 0 0;
	    background-color: #FBBD12;
	    opacity: 0;
	    transition: opacity .2s;
	}
	
	.loadmore {
	    display: flex;
	    width: 100%;
	    justify-content: center;
	    padding-top: 10rpx;
	    padding-bottom: 10rpx;
	}
	
	.line {
	    width: 2px;
	    height: 26rpx;
	    background-color: #ddd;
	}
</style>