<template>
  <view class="pages-a">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
        <view class="custom-nav__back" @click="tn('/pageA/navigation/navigation')">
          <view class="tn-icon-deploy"></view>
        </view>
        <view class="tn-margin-top" style="text-shadow:  1rpx 0 0 #FFF, 0 1rpx 0 #FFF, -1rpx 0 0 #FFF , 0 -1rpx 0 #FFF;">
          <tn-tabs :list="scrollList" :current="current" @change="tabChange" activeColor="#000" :bold="true" :fontSize="36"></tn-tabs>
        </view>
      </view>
    </tn-nav-bar>
    
    <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      
      <view class="tn-color-gray--dark" style="margin: 20rpx 30rpx 0 30rpx;border-radius: 100rpx;padding-left: 6rpx;background-color: rgba(248, 247, 248, 0.9);" @click="tn('/pageA/search/search')">
        <tn-notice-bar :list="searlist" mode="vertical" leftIconName="search" :duration="6000"></tn-notice-bar>
      </view>  
      
      <swiper class="card-swiper" :circular="true"
        :autoplay="true" duration="500" interval="8000" @change="cardSwiper"> 
        <swiper-item v-for="(item,index) in bannerList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner" :style="'background-image:url('+ item.url + item.path + ');background-size: cover;border-radius: 15rpx;'">
          </view>
          <view class="swiper-item-text">
            <view class="tn-text-bold tn-color-white" style="font-size: 50rpx;">{{item.first_title}}</view>
            <view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">{{item.second_title}}</view>
            <view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">{{item.text}}</view>
          </view>
        </swiper-item>
      </swiper>
      <view class="indication">
          <block v-for="(item,index) in bannerList" :key="index">
              <view class="spot" :class="cardCur==index?'active':''"></view>
          </block>
      </view>
    </view>
    
    
    <!-- 方式5，图片形式，安卓手机 start-->
    <view v-if="isAndroid" class="tn-flex tn-flex-wrap tn-padding-top home-shadow">
     <block v-for="(item, index) in menuList" :key="index">
      <view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="menuTn(item.navigate, index)">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" :style="'background-image:url('+ item.url + item.path +');background-size:100% 100%;background-size: cover;'">
          </view>
          <view class="tn-color-black tn-text-center">
            <text class="tn-text-ellipsis">{{ item.title }}</text>
          </view>
        </view>
      </view>
     </block>
    </view>
    <!-- 方式5 end-->
    
    <!-- 方式5，图片形式，苹果手机 start-->
    <view v-else class="tn-flex tn-flex-wrap tn-padding-top home-shadow">
     <block v-for="(item, index) in menuList" :key="index">
      <view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="menuTn(item.navigate, index)">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" :style="'background-image:url('+ item.url + item.path +');background-size:100% 100%;background-size: cover;'">
          </view>
          <view class="tn-color-black tn-text-center">
            <text class="tn-text-ellipsis">{{ item.title }}</text>
          </view>
        </view>
      </view>
     </block>
    </view>
    <!-- 方式5 end-->
    
    
    <!--胶囊 banner 需要可用显示出来即可 start-->
    <view class="tn-flex tn-flex-wrap tn-padding-bottom" @click="tn('')">
      <view class="" style="width: 100%;">
        <view class="image-piccapsule tn-shadow-blur" style="background-image:url('https://tnuiimage.tnkjapp.com/capsule-banner/banner-tnmb.png');">
           <view class="image-capsule">
           </view>
         </view>  
      </view>  
    </view>
    <!-- banner end-->
    
    
    <view class="">
      
      <view class="" v-if="current==0">
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
      
      <view class="" v-if="current==1">
       <view class="" style="padding: 6vh 20rpx;">
         <view class="tn-text-center" style="font-size: 200rpx;padding-top: 30rpx;">
           <text class="tn-icon-wea-wind tn-color-gray--light"></text>
         </view>
         <view class="tn-color-gray--disabled tn-text-center tn-text-lg">内容被台风吹走了</view>
       </view>
      </view>
      
      <view class="" v-if="current==2">
       <view class="" style="padding: 6vh 20rpx;">
         <view class="tn-text-center" style="font-size: 200rpx;padding-top: 30rpx;">
           <text class="tn-icon-wea-wind tn-color-gray--light"></text>
         </view>
         <view class="tn-color-gray--disabled tn-text-center tn-text-lg">内容被台风卷走了</view>
       </view>
      </view>
      
    </view>
    
   
    <!-- <view class='tn-tabbar-height'></view> -->
    
  </view>
</template>

<script>
	import { bannerList } from '@/utils/api/banner'
	import { seriesList, imageList } from '@/utils/api/image'
  export default {
    name: 'PagesA',
    data(){
      return {
        menuList: [],
        searlist: [
          '凶姐精美壁纸',
          '情侣聊天背景',
          '热血动漫头像',
          '手机屏保壁纸'
        ],
        cardCur: 0,
        isAndroid: true,
        bannerList: [],        
        current: 0,
        scrollList: [
          {name: '推荐'},
          {name: '最新'},
          {name: '热门'}
        ],
        /* 瀑布流*/
        loadStatus: 'loadmore',
        list: [],
				queryWhere: {
					page: 1,
					size: 20,
				},
      }
    },
    created() {
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
        this.isAndroid = false
      } else {
        this.isAndroid = true
      }
      /* 瀑布流*/
      // this.getRandomData()
			this.getBannerList()
			this.getMenuList()
			this.getImageList()
    },
    methods: {
			getImageList() {
				uni.showLoading({
					title: "努力加载中"
				})
				imageList(this.queryWhere).then(res => {
					if (res.items.length > 0) {
						this.list.push(...res.items)
						this.queryWhere.page = res.page + 1
					} else {
						this.loadStatus = 'nomore'
					}
					uni.hideLoading()
				})
			},
			menuTn(url, index) {
				uni.navigateTo({
					url:url + "?params=" + JSON.stringify(this.menuList[index])
				})
			},
			getBannerList() {
				bannerList().then(res => {
					this.bannerList = res.items
				})
			},
			getMenuList() {
				seriesList().then(res => {
					this.menuList = res.items
				})
			},
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      
      // tab选项卡切换
      tabChange(index) {
        this.current = index
      },

      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
     
      handleWaterFallFinish() {
				this.getImageList()
        this.loadStatus = 'loadmore'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pages-a{
    max-height: 100vh;
  }
  
  
  /* 自定义导航栏内容 start */
  .custom-nav {
    height: 100%;
    
    &__back {
      margin: auto 5rpx;
      font-size: 50rpx;
      margin-right: 10rpx;
      margin-left: 30rpx;
      flex-basis: 5%;
    }
  }
  
  /* 底部安全边距 start*/
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
    height: calc(140rpx + constant(safe-area-inset-bottom));
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
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 330rpx !important;
  }
    
  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    padding: 40rpx 30rpx 30rpx 30rpx;
    overflow: initial;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    border-radius: 15rpx;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    will-change: transform;
    // overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
    will-change: transform;
  }
    
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -220rpx;
    text-align: center;
    width: 100%;
    display: block;
    border-radius: 10rpx;
    transform: translate(100rpx, 0rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
    will-change: transform;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -220rpx;
    width: 100%;
    transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
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
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -70rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  

  /* 胶囊banner*/
  .image-capsule{
    padding: 100rpx 0rpx;
    font-size: 40rpx;
    font-weight: 300;
    position: relative;
  }
  .image-piccapsule{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 20rpx 20rpx 0 0;
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
    border: 1rpx solid rgba(255,255,255,0.05);
    // box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
  
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
  
  
</style>