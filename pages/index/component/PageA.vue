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
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner" :style="'background-image:url('+ item.url + ');background-size: cover;border-radius: 15rpx;'">
          </view>
          <view class="swiper-item-text">
            <view class="tn-text-bold tn-color-white" style="font-size: 50rpx;">{{item.title}}</view>
            <view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">{{item.name}}</view>
            <view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">{{item.text}}</view>
          </view>
        </swiper-item>
      </swiper>
      <view class="indication">
          <block v-for="(item,index) in swiperList" :key="index">
              <view class="spot" :class="cardCur==index?'active':''"></view>
          </block>
      </view>
    </view>
    
    
    <!-- 方式5，图片形式，安卓手机 start-->
    <view v-if="isAndroid" class="tn-flex tn-flex-wrap tn-padding-top home-shadow">
     <block v-for="(item, index) in icons1" :key="index">
      <view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="tn(item.url)">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" :style="'background-image:url('+ item.icon +');background-size:100% 100%;background-size: cover;'">
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
     <block v-for="(item, index) in icons2" :key="index">
      <view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="tn(item.url)">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" :style="'background-image:url('+ item.icon +');background-size:100% 100%;background-size: cover;'">
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
    <!-- <view class="tn-flex tn-flex-wrap tn-padding-bottom" @click="tn('')">
      <view class="" style="width: 100%;">
        <view class="image-piccapsule tn-shadow-blur" style="background-image:url('https://tnuiimage.tnkjapp.com/capsule-banner/banner-tnmb.png');">
           <view class="image-capsule">
           </view>
         </view>  
      </view>  
    </view> -->
    <!-- banner end-->
    
    
    <view class="">
      
      <view class="" v-if="current==0">
        <view class="" style="padding: 30rpx 20rpx;" >
          <tn-waterfall ref="waterfall" v-model="list" @finish="handleWaterFallFinish">
            <template v-slot:left="{ leftList }">
              <view v-for="(item, index) in leftList" :key="item.id" class="wallpaper__item" @click="tn('/pageA/details/details')">
                <view class="item__image">
                  <tn-lazy-load :threshold="6000" height="100%" :image="item.mainImage" :index="item.id" imgMode="widthFix"></tn-lazy-load>
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
                            <view class="" :style="'background-image:url('+ item.userImage +');width: 40rpx;height: 40rpx;background-size: cover;'">
                            </view>
                          </view>
                        </view>
                        <view class="tn-padding-left-xs">
                          <text class="tn-color-gray tn-text-sm">{{ item.userName }}</text>
                        </view>
                  
                      </view>
                    </view>
                    <view class="justify-content-item">
                      <text class="tn-icon-rocket tn-color-gray tn-padding-right-xs"></text>
                      <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}</text>
                    </view>
                  </view>
                  
                  
                </view>
              </view>
            </template>
            <template v-slot:right="{ rightList }">
              <view class="tn-color-black tn-text-bold tn-bg-yellow home-shadow" style="height: 160rpx;margin: 0 10rpx 20rpx 10rpx;border-radius: 10rpx;" @click="tn('/pageB/activity/activity')">
                <view class="tn-padding-left tn-padding-top-lg">
                  Ai · 广场
                </view>
                <view class="tn-padding-left tn-padding-top-xs">
                  晒出你的ai创作
                  <text class="tn-icon-right tn-padding-left-xs"></text>
                </view>
              </view>
              <view v-for="(item, index) in rightList" :key="item.id" class="wallpaper__item" @click="tn('/pageA/details/details')">
                <view class="item__image">
                  <tn-lazy-load :threshold="6000" height="100%" :image="item.mainImage" :index="item.id" imgMode="widthFix"></tn-lazy-load>
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
                            <view class="" :style="'background-image:url('+ item.userImage +');width: 40rpx;height: 40rpx;background-size: cover;'">
                            </view>
                          </view>
                        </view>
                        <view class="tn-padding-left-xs">
                          <text class="tn-color-gray tn-text-sm">{{ item.userName }}</text>
                        </view>
                  
                      </view>
                    </view>
                    <view class="justify-content-item">
                      <text class="tn-icon-rocket tn-color-gray tn-padding-right-xs"></text>
                      <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}</text>
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
  export default {
    name: 'PagesA',
    data(){
      return {
        icons1: [
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666765211148-assets/web-upload/bc9ff0e7-36a5-4d99-8698-cd589b00dc99.png",
            title: "人物写真",
            url: "/pageB/wallpaper/wallpaper"
          },
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666764788499-assets/web-upload/4cf1bbab-efb8-401c-9a2d-21689d024491.png",
            title: "动漫壁纸",
            url: "/pageB/wallpaper/wallpaper"
          },
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666765049011-assets/web-upload/e49243fa-5182-4fbb-a850-33e927316a90.png",
            title: "风景系列",
            url: "/pageB/wallpaper/wallpaper"
          },
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666764932305-assets/web-upload/8d5ff7dd-c2b0-4455-acf9-df6ba3a064b1.png",
            title: "安卓专属",
            url: "/pageB/wallpaper/wallpaper"
          }
        ],
        icons2: [
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666765211148-assets/web-upload/bc9ff0e7-36a5-4d99-8698-cd589b00dc99.png",
            title: "人物写真",
            url: "/pageB/wallpaper/wallpaper"
          },
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666764788499-assets/web-upload/4cf1bbab-efb8-401c-9a2d-21689d024491.png",
            title: "动漫壁纸",
            url: "/pageB/wallpaper/wallpaper"
          },
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666765049011-assets/web-upload/e49243fa-5182-4fbb-a850-33e927316a90.png",
            title: "风景系列",
            url: "/pageB/wallpaper/wallpaper"
          },
          {
            icon: "https://cdn.nlark.com/yuque/0/2022/png/280373/1666764932305-assets/web-upload/8d5ff7dd-c2b0-4455-acf9-df6ba3a064b1.png",
            title: "苹果专属",
            url: "/pageB/wallpaper/wallpaper"
          }
        ],
        searlist: [
          '凶姐精美壁纸',
          '情侣聊天背景',
          '热血动漫头像',
          '手机屏保壁纸'
        ],
        cardCur: 0,
        isAndroid: true,
        swiperList: [{
          id: 0,
          type: 'image',
          title: '合作勾搭',
          name: '作者微信 tnkewo',
          url: 'https://tnuiimage.tnkjapp.com/swiper/adno3.jpg',
        }, {
          id: 1,
          type: 'image',
          title: '海量分享',
          name: '总有你想不到的创意',
          url: 'https://tnuiimage.tnkjapp.com/swiper/adno2.jpg',
        }, {
          id: 2,
          type: 'image',
          title: '酷炫多彩',
          name: '更多彩蛋等你探索',
          url: 'https://tnuiimage.tnkjapp.com/swiper/adno4.jpg',
        }, {
          id: 3,
          type: 'image',
          title: '适配多端',
          name: 'APP、微信小程序、H5、Finclip',
          url: 'https://tnuiimage.tnkjapp.com/swiper/adno5.jpg',
        },{
          id: 4,
          type: 'image',
          title: '',
          name: '',
          url: 'https://tnuiimage.tnkjapp.com/swiper/ad1.jpg',
        }],
        
        current: 0,
        scrollList: [
          {name: '推荐'},
          {name: '最新'},
          {name: '热门'}
        ],
        
        
        /* 瀑布流*/
        loadStatus: 'loadmore',
        list: [],
        data: [
          {
            title: '看月亮爬上来',
            userName: '试试就逝世',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699064-assets/web-upload/17b99ae2-45d9-4399-b425-b972a7c53600.jpeg',
            userImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699098-assets/web-upload/e8b29292-72fc-4c1e-9d7c-fd9dba31cb62.jpeg',
            tags: ['头像','校园青春'],
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
            title: '万科神奇动物主场',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699053-assets/web-upload/8645ea3a-e0a9-4422-8364-cc5ede305c9f.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg',
            tags: ['壁纸','动态壁纸'],
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
            title: '北海世博园灯笼走廊',
            userName: '青梅煮马',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664015047023-assets/web-upload/147b0b7f-8253-4b92-bc1d-e28db7f54096.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
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
            title: '浦江航拍夜上海',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664015047529-assets/web-upload/af73d987-7e47-4ab9-8cc7-9ced5611552c.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
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
            title: '疫情也阻挡不了滑滑板',
            userName: '凶一下试试',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1671437658295-assets/web-upload/05620a1f-452e-4a14-9d30-f6c66ee4be1c.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg',
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
            title: '疫情也阻挡不了滑滑板',
            userName: '凶一下试试',
            mainImage: '          https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1671440476526-assets/web-upload/8179c7af-ec17-412c-b20b-877418a1abf9.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
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
            title: '2022建档百年 外滩灯光秀 与你一起',
            userName: '坟头草三米高',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699047-assets/web-upload/0be7773a-583d-43e4-a6af-91bcc7cc1ee1.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg',
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
            title: '广州纳达堡三室两厅',
            userName: '不许凶我',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664179989916-assets/web-upload/eda197eb-42ce-44b1-9b14-fce3481db603.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg',
            tags: ['头像','女生头像'],
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
            title: '冰岛极光航拍',
            userName: '试试就逝世',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699094-assets/web-upload/18d2ada5-2e44-4851-9ba1-2342a5383f3d.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
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
            title: '泰山之巅',
            userName: '你的名字',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699069-assets/web-upload/20b02200-47de-4a03-8dd0-6fe8aa575e36.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
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
            title: '广州分手塔',
            userName: '图鸟东东',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699075-assets/web-upload/aaee3258-46b7-43ae-aaf2-02f3dff5f960.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
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
            title: '珠海澳门捉猪行动',
            userName: '此处凶姐承包',
            mainImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664015223233-assets/web-upload/1f3e6f2a-96eb-4796-818e-e94ec06d8872.jpeg',
            userImage: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
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
    created() {
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
        this.isAndroid = false
      } else {
        this.isAndroid = true
      }
      /* 瀑布流*/
      this.getRandomData()
    },
    methods: {
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