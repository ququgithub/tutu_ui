<template>
  <view class="tn-safe-area-inset-bottom">
<!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" :backgroundColor="navBarBackgroundColor" id="navbar">
      <view slot="back" class='tn-custom-nav-bar__back' @click="goBack" :style="[navBarStyle]">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-discover-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center" :style="[navBarStyle2]">
        <view class="tn-text-bold tn-text-xl">人物写真</view>
      </view>
    </tn-nav-bar>
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="22000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
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
                人物写真
              </view>
              <view class="tn-padding-right tn-padding-top-sm tn-text-ellipsis tn-text-sm">
                <text class="tn-padding-right-sm">下图为Hải Nguyễn网络博主的免费可商用图片</text>
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
      <!-- <view class="tn-flex tn-flex-row-between" style="padding: 60rpx 0 30rpx 0;">
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
      
    
      <view class="" style="padding: 30rpx 20rpx;" >
          <tn-waterfall ref="waterfall" v-model="list" @finish="handleWaterFallFinish">
            <template v-slot:left="{ leftList }">
              <view v-for="(item, index) in leftList" :key="item.id" class="product__item" @click="tn('/pageA/details/details')">
                <view class="item__image">
                  <tn-lazy-load :threshold="6000" height="100%" :image="item.mainImage" :index="item.id" imgMode="widthFix"></tn-lazy-load>
                </view>
                <!-- <view class="item__data">
                  <view class="item__title-container">
                    <text class="item__title tn-color-black">{{ item.title }}</text>
                  </view>
                  <view v-if="item.tags && item.tags.length > 0" class="item__tags-container">
                    <view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
                  </view>
                </view> -->
              </view>
            </template>
            <template v-slot:right="{ rightList }">
              <view v-for="(item, index) in rightList" :key="item.id" class="product__item" @click="tn('/pageA/details/details')">
                <view class="item__image">
                  <tn-lazy-load :threshold="6000" height="100%" :image="item.mainImage" :index="item.id" imgMode="widthFix"></tn-lazy-load>
                </view>
                <!-- <view class="item__data">
                  <view class="item__title-container">
                    <text class="item__title tn-color-black">{{ item.title }}</text>
                  </view>
                  <view v-if="item.tags && item.tags.length > 0" class="item__tags-container">
                    <view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
                  </view>
                </view> -->
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
  export default {
    name: 'TemplateWallpaper',
    mixins: [template_page_mixin],
    data(){
      return {
        show1: false,
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603452-assets/web-upload/c206eac9-0690-436f-8c89-5e652503cfe6.jpeg',
        }, {
          id: 1,
          type: 'image',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603386-assets/web-upload/13ccbeff-8878-41f5-abd9-96bb1aaa267a.jpeg',
        }, {
          id: 2,
          type: 'image',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603492-assets/web-upload/9d4b96de-55f8-4808-83a7-9962be5b2477.jpeg',
        }, {
          id: 3,
          type: 'image',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603381-assets/web-upload/15743f8a-2c04-4ab3-8140-1d93f58b094a.jpeg',
        },
        {
          id: 4,
          type: 'image',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603530-assets/web-upload/ef2234e6-6419-4c2a-921b-927a61ecfffa.jpeg',
        }],
        
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
        data: [
          {
            title: '酷炫外卖首页',
            userName: '试试就逝世',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603328-assets/web-upload/0506256f-4ea4-4b19-a0aa-b032e31eb0a2.jpeg',
            userImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699098-assets/web-upload/e8b29292-72fc-4c1e-9d7c-fd9dba31cb62.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: true, // 是否为新品
            tags: ['首页','美食'],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 338
            },
          },
          {
            title: '内容发布页',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603332-assets/web-upload/83f4706e-9e88-4748-80dd-350b514b5c9e.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['表单','新建'],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 289
            },
          },
          {
            title: '商品详情，带购物车动画',
            userName: '青梅煮马',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603396-assets/web-upload/a7f7dd1d-3618-4888-a20c-6b55a6aa69a4.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: true, // 是否为新品
            tags: ['男生头像','情侣头像'],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 381
            },
          },
          {
            title: '简约个人中心页',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603328-assets/web-upload/89c4931b-bbdf-413f-806f-e73f0d291e8d.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: true, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 526
            },
          },
          {
            title: '消息通知页面',
            userName: '坟头草三米高',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603394-assets/web-upload/901c83d3-f0ef-4ef8-acd8-fe16934672e1.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 372
            },
          },
          {
            title: '弹窗领红包',
            userName: '不许凶我',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603386-assets/web-upload/13ccbeff-8878-41f5-abd9-96bb1aaa267a.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['弹窗','模态窗'],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 694
            },
          },
          {
            title: '系统设置',
            userName: 'seventeen',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603381-assets/web-upload/15743f8a-2c04-4ab3-8140-1d93f58b094a.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 508
            },
          },
          {
            title: '金融理财首页',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603455-assets/web-upload/997b637d-3435-44ee-a7cd-dc6914126f99.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 923
            },
          },
          {
            title: '图片视频编辑上传',
            userName: '图鸟东东',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603418-assets/web-upload/2f17ab8f-d0c0-4727-b1d6-5f5f9222452b.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 989
            },
          },
          {
            title: '路线导航',
            userName: '此处凶姐承包',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603403-assets/web-upload/c0ae4a35-6e63-4bf3-b7db-7a5b085ed5a4.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
          },
          {
            title: '系统设置',
            userName: 'seventeen',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603452-assets/web-upload/c206eac9-0690-436f-8c89-5e652503cfe6.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 508
            },
          },
          {
            title: '金融理财首页',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603449-assets/web-upload/55a2f676-4e6d-482a-854f-07cd984e0e8a.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 923
            },
          },
          {
            title: '图片视频编辑上传',
            userName: '图鸟东东',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603492-assets/web-upload/9d4b96de-55f8-4808-83a7-9962be5b2477.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 989
            },
          },
          {
            title: '路线导航',
            userName: '此处凶姐承包',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603439-assets/web-upload/82420ab2-45ae-47a3-b344-583dc74f9510.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
          },
          {
            title: '系统设置',
            userName: 'seventeen',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603408-assets/web-upload/3220af13-505c-45e8-b945-c013b98d2e97.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 508
            },
          },
          {
            title: '金融理财首页',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603509-assets/web-upload/d1dcb46a-2589-4b26-b443-9fe9b52f8dc1.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 923
            },
          },
          {
            title: '图片视频编辑上传',
            userName: '图鸟东东',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603532-assets/web-upload/c8f3f24f-789c-474f-9fdf-831bedb7833c.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 989
            },
          },
          {
            title: '路线导航',
            userName: '此处凶姐承包',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603498-assets/web-upload/62858fcd-ca48-45c2-8ffe-2204f646a6dd.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
          },
          {
            title: '系统设置',
            userName: 'seventeen',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603544-assets/web-upload/0f26f622-b992-4480-8203-caddf9ff994c.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 508
            },
          },
          {
            title: '金融理财首页',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603532-assets/web-upload/9415afc4-a3dd-4b53-9acd-b746b8df2b4e.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 923
            },
          },
          {
            title: '图片视频编辑上传',
            userName: '图鸟东东',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603530-assets/web-upload/ef2234e6-6419-4c2a-921b-927a61ecfffa.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 989
            },
          },
          {
            title: '路线导航',
            userName: '此处凶姐承包',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603568-assets/web-upload/d3e42c95-74ff-46ab-885c-f5c9531b3996.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
          },
          {
            title: '路线导航',
            userName: '此处凶姐承包',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1668321603649-assets/web-upload/a8394b38-ba4b-4df4-9f9a-fa40469f03cd.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'},
                {src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
          }
        ],
      }
    },

    onLoad() {
      this.getRandomData()
    },
    onReachBottom() {
      this.getRandomData()
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
      /* 瀑布流*/
      // 获取随机数据
      getRandomData() {
        console.log(13);
        this.loadStatus = 'loading'
        for (let i = 0; i < 10; i++) {
          let index = this.$t.number.randomInt(0, this.data.length - 1)
          let item = JSON.parse(JSON.stringify(this.data[index]))
          item.id = this.$t.uuid()
          this.list.push(item)
        }
      },
      // 瀑布流加载完毕事件
      handleWaterFallFinish() {
        this.loadStatus = 'loadmore'
      },
    }
  }
</script>

<style lang="scss" scoped>
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
    width: 100rpx;
    height: 100rpx;
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
