<template>
  <view class="tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    <view class="tn-search-fixed">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin" :style="{marginTop: vuex_custom_bar_height + 'px'}">
        
        <view class="justify-content-item align-content-item" style="width: 100vw;">
          <view class="tn-flex tn-flex-col-center" style="border-radius: 100rpx;padding: 10rpx 20rpx 10rpx 20rpx;width: 90%;background-color: rgba(248, 247, 248, 0.9);">
            <text class="tn-icon-search justify-content-item tn-padding-right-xs tn-color-gray tn-text-lg"></text>
            <input class="justify-content-item" placeholder="想搜点什么咧" name="input" placeholder-style="color:#AAAAAA" style="width: 90%;"></input>
          </view>
        </view>
        
        <view class="align-content-item">
          <view class="justify-content-item tn-text-center">
            <tn-button backgroundColor="#3668fc" shape="round" padding="20rpx 20rpx" width="150rpx" @tap="">
              <text class="tn-color-white">搜 索</text>
            </tn-button>

          </view>
        </view>
      </view>
    </view>
    
    <view class="" style="margin-top: 160rpx;" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-margin" >
        <view class="justify-content-item tn-text-bold">
          <text class="tn-text-df tn-color-black">最近搜索</text>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey">
          <text class="tn-padding-xs">删除</text>
          <text class="tn-icon-delete"></text>
        </view>
      </view>
    </view>
    
    <view class="">
      <view class="tn-tag-search tn-margin tn-text-justify">
        <view v-for="(item, index) in tagList" :key="index" class="tn-tag-search__item tn-margin-right tn-round tn-text-sm tn-bg-gray--light tn-color-gray">
          <text class="tn-tag-search__item--prefix">#</text> {{ item.title }}
        </view>
      </view>
    </view>
    
    <view class="tn-flex tn-flex-row-between tn-padding-top-xl tn-margin tn-padding-bottom">
      <view class="justify-content-item tn-text-bold">
        <text class="tn-text-df tn-color-black">搜索结果</text>
      </view>
      <view class="justify-content-item tn-text-df tn-color-grey">
        <text class="tn-padding-xs">筛选</text>
        <text class="tn-icon-filter"></text>
      </view>
    </view>
    
    
    <!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
    <view class="tn-margin-bottom-lg">
      <block v-for="(item, index) in content" :key="index">
        <view class="article-shadow tn-margin" @click="tn('/circlePages/news')">
          <view class="tn-flex">
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                <text class="">{{ item.title }}</text>
              </view>
              <view class="tn-padding-top-xs" style="min-height: 90rpx;">
                <text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
                  {{ item.desc }}
                </text>
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-between">
                <view v-for="(label_item,label_index) in item.label" :key="label_index" style="transform: translate(0rpx,6rpx);"
                  class="justify-content-item tn-tag-content__item tn-margin-right-xs tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                  <text class="tn-tag-content__item--prefix">#</text> {{ label_item }}
                </view>
                <view class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled" style="padding-top: 15rpx;">
                  <text class="tn-icon-footprint tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-padding-right tn-text-df">{{ item.collectionCount }}</text>
                  <text class="tn-icon-like-lack tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-text-df">{{ item.likeCount }}</text>
                </view>
              </view>
            </view>
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
              <view class="image-article">
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateSearch',
    mixins: [template_page_mixin],
    data(){
      return {
        inputValue: '',
        
        tagList: [
          {
            color: 'red',
            title: "救救孩子",
          },
          {
            color: 'cyan',
            title: "今天的Bug写了吗",
          },
          {
            color: 'blue',
            title: "北北猪",
          },
          {
            color: 'green',
            title: "捉住那只北北猪",
          },
          {
            color: 'orange',
            title: "祭天叭，产品经理",
          },
          {
            color: 'purple',
            title: "快醒醒，来需求了",
          },
          {
            color: 'brown',
            title: "冬天的第一次🐏🐏",
          }
        ],
        content: [{
            userAvatar: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'red',
            label: ['小程序'],
            title: '小程序官网源码，已上线',
            desc: '小程序前端源码，欢迎白嫖嗷嗷，可以的话，插件市场三连支持一下',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/prototype2.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 567
            },
            collectionCount: 543,
            commentCount: 543,
            likeCount: 206
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/blogger/blogger_beibei.jpg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'cyan',
            label: ['模型'],
            title: '一个拥有大量3D模型的网站',
            desc: '3D模型了解一下？',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/prototype1.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 987
            },
            collectionCount: 567,
            commentCount: 69,
            likeCount: 65
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'blue',
            label: ['UI设计'],
            title: '为什么资讯不显示时间？',
            desc: '你确定你经常更新文章吗？',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/computer2.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 321
            },
            collectionCount: 654,
            commentCount: 232,
            likeCount: 543
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'green',
            label: ['创意'],
            title: '创意一点点',
            desc: '创意灵感从这里开始',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/phonecase1.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 230
            },
            collectionCount: 987,
            commentCount: 236,
            likeCount: 342
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/shop/phonecase2.jpg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'orange',
            label: ['UI设计'],
            title: '图鸟UI素材已上传语雀',
            desc: '语雀素材地址资源',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/phonecase2.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 106
            },
            collectionCount: 765,
            commentCount: 32,
            likeCount: 91
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/shop/watch1.jpg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'purplered',
            label: ['神器'],
            title: '最强的视频转GIF工具',
            desc: '神器推荐',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/watch1.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 232
            },
            collectionCount: 776,
            commentCount: 48,
            likeCount: 86
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/shop/sticker.jpg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'purple',
            label: ['粒子'],
            title: '酷炫的小程序粒子效果一览',
            desc: '小程序粒子效果',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/sticker.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 456
            },
            collectionCount: 342,
            commentCount: 42,
            likeCount: 76
          },
          {
            userAvatar: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'brown',
            label: ['工具'],
            title: '小程序任意页面生成二维码',
            desc: '二维码生成器',
            mainImage: 'https://tnuiimage.tnkjapp.com/shop/card.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://tnuiimage.tnkjapp.com/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 129
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          }
        ],
      }
    },
    methods: {
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
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
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 1000rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.5);
    color: #FFFFFF;
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
      opacity: 0.7;
      background-color: #FFFFFF;
    }
  }
  
  .tn-search-fixed{
    position: fixed;
    top: 50rpx;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 1;
  }

  
  /* 搜索标签 start*/
  .tn-tag-search {
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
  /* 标签内容 end*/
  
  /* 标题 start */
  .nav_title {
    -webkit-background-clip: text;
    color: transparent;
    
    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      font-size: 42rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://tnuiimage.tnkjapp.com/title_bg/title00.png);
      background-size: cover;
    }
  }
  /* 标题 end */
  
  /* 富文本图示意 start */
  .news-img {
    z-index: -1;
    padding-bottom: 40rpx;
  
    image {
      width: 100%;
      margin: 20rpx 0;
      // height: 3373rpx;
      // z-index: -1;
    }
  }
  
  /* 资讯主图 start*/
  .image-article {
    border-radius: 8rpx;
    border: 1rpx solid #F8F7F8;
    width: 200rpx;
    height: 200rpx;
    position: relative;
  }
  
  .image-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 10rpx;
  }
  
  .article-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  /* 文字截取*/
  .clamp-text-1 {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .clamp-text-2 {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 35rpx;
      padding: 7rpx 25rpx 5rpx 25rpx;
  
      &--prefix {
        padding-right: 10rpx;
      }
    }
  }
  
  /* 标签内容 end*/
</style>
