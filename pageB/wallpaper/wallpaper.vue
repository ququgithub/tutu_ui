<template>
  <view class="tn-safe-area-inset-bottom">
<!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" :backgroundColor="navBarBackgroundColor" id="navbar">
      <view slot="back" class='tn-custom-nav-bar__back' @click="goBack" :style="[navBarStyle]">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-discover-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center" :style="[navBarStyle2]">
        <view class="tn-text-bold tn-text-xl">{{imageSeries.title}}</view>
      </view>
    </tn-nav-bar>
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="5000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in list" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner">
          <image :src="item.url + item.path" mode="aspectFill"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in list" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view>
    
    <!-- 头部start-->
    <view class="shop-function tn-margin-bottom-xl" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="tn-color-white" style="width: 90vw;">
              <view class="tn-padding-right tn-text-xxl tn-text-bold">
                {{imageSeries.title}}
              </view>
              <view class="tn-padding-right tn-padding-top-sm tn-text-ellipsis tn-text-sm">
                <text class="tn-padding-right-sm">下列所有图片均来自网络图片，有兔兔搜图提供，平台不保证是否原图支持商用</text>
              </view>
            </view>
          </view>
        </view>
        <!-- <view class="justify-content-item tn-flex-row-center">
          <view class="logo-pic tn-shadow">
            <view class="logo-image">
              <view class="tn-shadow-blur" style="background-image:url('https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603455-assets/web-upload/997b637d-3435-44ee-a7cd-dc6914126f99.jpeg');width: 100rpx;height: 100rpx;background-size: cover;">
              </view>
            </view>
          </view>
        </view> -->
      </view>
    </view>
    <!-- 头部 end-->
    
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <image @tap="previewQRCodeImage" src='https://tnuiimage.tnkjapp.com/advertise/qrcode.jpg' mode='aspectFill' style="width: 100%;"></image>
        <view class="tn-text-center tn-padding-top">欢迎加入【图鸟UI】圈子群</view>
        <view class="tn-text-center tn-padding-top tn-text-lg">点击上图，可识别微信二维码</view>
      </view>
    </tn-modal>
    
    <view class="group-wrap tn-bg-white" id="page_tips">
      
      <!-- 悬浮按钮-->
<!--      <view class="tn-flex tn-flex-row-between" style="padding: 60rpx 0 30rpx 0;">
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
          <tn-button backgroundColor="#3668fc" padding="40rpx 0" width="90%" shadow fontBold @click="showModal">
            <text class="tn-icon-wechat tn-padding-right-xs tn-color-white"></text>
            <text class="tn-color-white">微 信</text>
          </tn-button>
        </view>
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
          <tn-button backgroundColor="#fbbd12" padding="40rpx 0" width="90%" shadow fontBold open-type="share">
            <text class="tn-icon-send tn-padding-right-xs tn-color-white"></text>
            <text class="tn-color-white">分 享</text>
          </tn-button>
        </view>
      </view> -->
      
    
      <!-- <view class="" style="padding: 30rpx 20rpx;" >
          <tn-waterfall ref="waterfall" v-model="list" @finish="handleWaterFallFinish">
            <template v-slot:left="{ leftList }">
              <view v-for="(item, index) in leftList" :key="item.uid" class="product__item" @click="tn('/pageA/details/details?image_uid=' + item.uid)">
                <view class="item__image">
                  <tn-lazy-load :threshold="6000" height="100%" :image="item.url + item.path" :index="item.uid" imgMode="widthFix"></tn-lazy-load>
                </view>
                <view class="item__data">
                  <view class="item__title-container">
                    <text class="item__title tn-color-black">{{ item.title }}</text>
                  </view>
                  <view v-if="item.tags && item.tags.length > 0" class="item__tags-container">
                    <view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
                  </view>
                </view>
              </view>
            </template>
            <template v-slot:right="{ rightList }">
              <view v-for="(item, index) in rightList" :key="item.uid" class="product__item" @click="tn('/pageA/details/details?image_uid=' + item.uid)">
                <view class="item__image">
                  <tn-lazy-load :threshold="6000" height="100%" :image="item.url + item.path" :index="item.uid" imgMode="widthFix"></tn-lazy-load>
                </view>
                <view class="item__data">
                  <view class="item__title-container">
                    <text class="item__title tn-color-black">{{ item.title }}</text>
                  </view>
                  <view v-if="item.tags && item.tags.length > 0" class="item__tags-container">
                    <view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
                  </view>
                </view>
              </view>
            </template>
          </tn-waterfall>
        </view> -->
				<view class="" style="padding: 30rpx 20rpx;" >
					<tn-waterfall ref="waterfall" v-model="list" @finish="handleWaterFallFinish">
						<template v-slot:left="{ leftList }">
							<view v-for="(item, index) in leftList" :key="item.uid" class="wallpaper__item" @click="tn('/pageA/details/details?image_uid=' + item.uid)">
								<view class="item__image">
									<tn-lazy-load :threshold="6000" height="100%" :image="item.url + item.path" :index="item.uid" imgMode="widthFix"></tn-lazy-load>
								</view>
								<view class="item__data">
									<view class="item__title-container">
										<text class="item__title tn-color-black">{{ item.title }}</text>
									</view>
									<view v-if="item.tags && item.tags.length > 0" class="item__tags-container">
										<view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
									</view>
			
									<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs">
										<view class="justify-content-item">
											<view class="tn-flex tn-flex-col-center tn-flex-row-left">
												<view class="logo-pic">
													<view class="logo-image">
														<view class="" :style="'background-image:url('+ item.author.qr_url +');width: 40rpx;height: 40rpx;background-size: cover;'">
														</view>
													</view>
												</view>
												<view class="tn-padding-left-xs">
													<text class="tn-color-gray tn-text-sm">{{ item.user.nickname }}</text>
												</view>
									
											</view>
										</view>
										<view class="justify-content-item">
											<text class="tn-icon-rocket tn-color-gray tn-padding-right-xs"></text>
											<text class="tn-color-gray">{{ item.download }}</text>
										</view>
									</view>
									
									
								</view>
							</view>
						</template>
						<template v-slot:right="{ rightList }">
							<!-- <view class="tn-color-black tn-text-bold tn-bg-yellow home-shadow" style="height: 160rpx;margin: 0 10rpx 20rpx 10rpx;border-radius: 10rpx;" @click="tn('/pageB/activity/activity')">
								<view class="tn-padding-left tn-padding-top-lg">
									Ai · 广场
								</view>
								<view class="tn-padding-left tn-padding-top-xs">
									晒出你的ai创作
									<text class="tn-icon-right tn-padding-left-xs"></text>
								</view>
							</view> -->
							<view v-for="(item, index) in rightList" :key="item.uid" class="wallpaper__item" @click="tn('/pageA/details/details?image_uid=' + item.uid)">
								<view class="item__image">
									<tn-lazy-load :threshold="6000" height="100%" :image="item.url + item.path" :index="item.uid" imgMode="widthFix"></tn-lazy-load>
								</view>
								<view class="item__data">
									<view class="item__title-container">
										<text class="item__title tn-color-black">{{ item.title }}</text>
									</view>
									<view class="item__tags-container">
										<view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
									</view>
									<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs">
										<view class="justify-content-item">
											<view class="tn-flex tn-flex-col-center tn-flex-row-left">
												<view class="logo-pic">
													<view class="logo-image">
														<view class="" :style="'background-image:url('+ item.author.qr_url +');width: 40rpx;height: 40rpx;background-size: cover;'">
														</view>
													</view>
												</view>
												<view class="tn-padding-left-xs">
													<text class="tn-color-gray tn-text-sm">{{ item.user.nickname }}</text>
												</view>
									
											</view>
										</view>
										<view class="justify-content-item">
											<text class="tn-icon-rocket tn-color-gray tn-padding-right-xs"></text>
											<text class="tn-color-gray">{{ item.download }}</text>
										</view>
									</view>
								</view>
							</view>
						</template>
					</tn-waterfall>
				</view>
				<tn-load-more :status="loadStatus"></tn-load-more>

    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import { imageList } from '@/utils/api/image.js'
  export default {
    name: 'TemplateWallpaper',
    mixins: [template_page_mixin],
    data(){
      return {
        show1: false,
        cardCur: 0,
        imageSeries: {},
        /* 导航*/
        navBarRectInfo: {},
        navBarChangebaseLineHeight: 0,
        navBarStyle: {
          color:'#FFFFFF',
          opacity: 1,
          display: 'flex'
        },
        navBarStyle2: {
          color:'rgba(255,255,255,0)',
          opacity: 1,
          display: 'flex'
        },
        navBarBackgroundColor: 'rgba(255, 255, 255, 0)',
        activeBgAnimation: {},
        
        /* 瀑布流*/
        loadStatus: 'loadmore',
        list: [],
				queryWhere: {
					page: 1,
					size: 20,
					series_uid: ""
				},
			}
    },
    onLoad(params) {
			this.imageSeries = JSON.parse(params.params)
			console.log(this.imageSeries)
			this.queryWhere.series_uid = this.imageSeries.uid
			this.getImageList()
    },
    onReachBottom() {
			this.getImageList()
    },
    
    onReady() {
      this.$nextTick(() => {
        this.initNavBarRectInfo()
      })
    },
    onPageScroll() {
      this.updateNavBarRectInfo()
    },
    methods: {
			getImageList() {
				console.log(this.queryWhere)
				imageList(this.queryWhere).then(res => {
					if (res.items.length > 0) {
						this.list.push(...res.items)
						this.queryWhere.page = res.page + 1
					} else {
						this.loadStatus = 'nomore'
					}
				})
			},
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // 预览圈子管理员微信图片
      previewQRCodeImage() {
        wx.previewImage({
          urls: ['https://tnuiimage.tnkjapp.com/advertise/qrcode.jpg']
        })
      },
      // 弹出模态框
      showModal(event) {
        this.openModal()
      },
      // 打开模态框
      openModal() {
        this.show1 = true
      },
      // 初始化导航栏信息
      async initNavBarRectInfo() {
        const navBarRectInfo = await this._tGetRect('#navbar')
        const pageTipsRectInfo = await this._tGetRect('#page_tips')
        // console.log(navBarRectInfo, pageTipsRectInfo, navBarRectInfo?.top, pageTipsRectInfo?.top);
        if (!navBarRectInfo.hasOwnProperty('top') || !pageTipsRectInfo.hasOwnProperty('top')) {
          setTimeout(() => {
            this.initNavBarRectInfo()
          }, 10)
          return
        }
        this.navBarRectInfo = {
          top: navBarRectInfo.top
        }
        this.navBarChangebaseLineHeight = pageTipsRectInfo.top - navBarRectInfo.top
      },
      // 更新导航栏信息
      updateNavBarRectInfo() {
        this._tGetRect('#page_tips').then((res) => {
          const top = res?.top || 0
          if (!top) {
            return
          }
          const differHeight = top - this.navBarRectInfo.top
          const opacity = differHeight / this.navBarChangebaseLineHeight
          if (opacity < 0) {
            // this.navBarStyle.opacity = 1
            // this.navBarStyle.display = 'flex'
            this.navBarStyle.color = 'rgba(0, 0, 0, ${opacity})'
            this.navBarStyle2.color = 'rgba(0, 0, 0, ${opacity})'
            this.navBarBackgroundColor = `rgba(255, 255, 255, 1)`
          } else {
            // this.navBarStyle.opacity = 1 - opacity
            // this.navBarStyle.display = 'flex'
            this.navBarStyle.color = 'rgba(255, 255, 255, 1)'
            this.navBarStyle2.color = 'rgba(255, 255, 255, 0)'
            this.navBarBackgroundColor = `rgba(255, 255, 255, ${1 - opacity})`
          }
          
          // console.log(top, differHeight, opacity);
        })
      },
      // 瀑布流加载完毕事件
      handleWaterFallFinish() {
        this.loadStatus = 'loadmore'
      },
    }
  }
</script>

<style lang="scss" scoped>
	/* 瀑布流*/
	.wallpaper__item {
	  background-color: #FFFFFF;
	  overflow: hidden;
	  margin: 0 10rpx;
	  margin-bottom: 40rpx;
	  // box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
	  
	  .item {
	    /* 图片 start */
	    &__image {
	      width: 100%;
	      height: auto;
	      background-color: #FFFFFF;
	      border: 1rpx solid #F8F7F8;
	      border-radius: 10rpx;
	      overflow: hidden;
	    }
	    /* 图片 end */
	    
	    /* 内容 start */
	    &__data {
	      padding: 14rpx 0rpx;
	    }
	    
	    /* 标题 start */
	    &__title-container {
	      text-align: justify;
	      line-height: 38rpx;
	      vertical-align: middle;
	    }
	    &__title {
	      font-size: 30rpx;
	    }
	    /* 标题 end */
	    
	    /* 标签 start */
	    &__tags-container {
	      display: flex;
	      flex-direction: row;
	      flex-wrap: nowrap;
	      align-items: center;
	      justify-content: flex-start;
	    }
	    &__tag {
	      margin: 10rpx;
	      color: #7C8191;
	      background-color: #F3F2F7;
	      padding: 4rpx 14rpx 6rpx;
	      border-radius: 10rpx;
	      font-size: 20rpx;
	      
	      &:first-child {
	        margin-left: 0rpx !important;
	      }
	    }
	    /* 标签 end */
	    
	    /* 内容 end */
	  }
	}
  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 1000rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.5);
    // color: #FFFFFF;
    font-size: 18px;
    
    .icon {
      display: block;
      flex: 1;
      margin: auto;
      text-align: center;
    }
    
    &:before {
      content: " ";
      width: 1rpx;
      height: 110%;
      position: absolute;
      top: 22.5%;
      left: 0;
      right: 0;
      margin: auto;
      transform: scale(0.5);
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      opacity: 0.05;
      background-color: #000000;
    }
  }
  
  /* 内容 start*/
  .tn-plan-content {
    &__item {
      display: inline-block;
      line-height: 45rpx;
      padding: 10rpx 30rpx;
      margin: 20rpx 20rpx 5rpx 0rpx;
      
      &--prefix {
        padding-right: 10rpx;
      }  
    }
  }
  /* 内容 end*/
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 500rpx !important;
  }
    
  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    // padding: 0rpx 30rpx 90rpx 30rpx;
    overflow: initial;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    will-change: transform;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
    will-change: transform;
  }
  
  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner image{
    width: 100%;
    height: 100%;
  }
  
  /* 轮播指示点 start*/
  .indication{
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    opacity: 0;
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -60rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 顶部店铺 */
  .shop-function {
      position: relative;
      z-index: 1;
      margin-top: -450rpx;
      padding-bottom: 110rpx;
      background-image: linear-gradient(rgba(255, 255, 255, 0.01), rgba(0, 0, 0, 0.4));
  }
  
  /* 用户头像 start */
  .logo-image {
    width: 40rpx;
    height: 40rpx;
    position: relative;
  }
  
  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border: 6rpx solid rgba(255,255,255,0.25);
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
  
  /* 内容*/
  .group-wrap {
    position: relative;
    z-index: 1;
    // padding: 20rpx 30rpx;
    margin-top: -130rpx;  
    margin-bottom: 40rpx;
    border-radius: 30rpx 30rpx 0 0;
  }
  
  /* 阴影 start*/
  .mould-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }    
  
  .tn-tabbar-height {
  	min-height: 20rpx;
  	height: calc(40rpx + env(safe-area-inset-bottom) / 2);
  }
  
  /* 图标容器5 start */
  .icon5 {
    &__item {
      // width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 0rpx;
      margin: 0rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
      }
    }
  }  
  
  
  /* 瀑布流*/
  .product__item {
    background-color: #FFFFFF;
    overflow: hidden;
    margin: 0 10rpx;
    margin-bottom: 20rpx;
    // box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    
    .item {
      /* 图片 start */
      &__image {
        width: 100%;
        height: auto;
        background-color: #FFFFFF;
        border: 1rpx solid #F8F7F8;
        border-radius: 10rpx;
        overflow: hidden;
      }
      /* 图片 end */
      
      /* 内容 start */
      &__data {
        padding: 14rpx 0rpx;
      }
      
      /* 标题 start */
      &__title-container {
        text-align: justify;
        line-height: 38rpx;
        vertical-align: middle;
      }
      &__store-type {
        height: 28rpx;
        font-size: 20rpx;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 4rpx;
        border-radius: 6rpx;
        white-space: nowrap;
        text-align: center;
        top: -2rpx;
        margin-right: 6rpx;
      }
      &__title {
        font-size: 30rpx;
      }
      /* 标题 end */
      
      /* 标签 start */
      &__tags-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
      }
      &__tag {
        margin: 10rpx;
        color: #7C8191;
        background-color: #F3F2F7;
        padding: 4rpx 14rpx 6rpx;
        border-radius: 10rpx;
        font-size: 20rpx;
        
        &:first-child {
          margin-left: 0rpx !important;
        }
      }
      /* 标签 end */
      /* 内容 end */
    }
  }
  
</style>
