<template>
	<view class="template-edit tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
		
    <view class="tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
        <view class="tn-flex justify-content-item">
          <view class="tn-bg-black tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-topics" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-text-bold">想说点什么 *</view>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey">
          <text class="tn-padding-xs">500字内</text>
          <text class="tn-icon-keyboard-circle"></text>
        </view>
      </view>
      
      <!-- <view class="tn-margin tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;">
      	<input placeholder="写下一句简短的标题" name="input" placeholder-style="color:#AAAAAA" ></input>
      </view> -->
      <view class="tn-margin tn-bg-gray--light tn-padding" style="border-radius: 10rpx;">
        <textarea maxlength="500" placeholder="说点什么 , 万一火了呢" placeholder-style="color:#AAAAAA" style="height: 160rpx;"></textarea>
      </view>
      
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
        <view class="tn-flex justify-content-item">
          <view class="tn-bg-black tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-image" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-text-bold">发点什么图咧 *</view>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey" @tap="clear">
          <text class="tn-padding-xs">清空上传</text>
          <text class="tn-icon-delete"></text>
        </view>
      </view>
      
      
      
      
      <view class="tn-margin-left tn-padding-top-xs">
        <tn-image-upload-drag
          ref="imageUpload"
          :action="action"
          :width="236"
          :height="236"
          :formData="formData"
          :fileList="fileList"
          :disabled="disabled"
          :autoUpload="autoUpload"
          :maxCount="maxCount"
          :showUploadList="showUploadList"
          :showProgress="showProgress"
          :deleteable="deleteable"
          :customBtn="customBtn"
          @sort-list="onSortList"
        />
      
      </view>
      
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
        <view class="tn-flex justify-content-item">
          <view class="tn-bg-black tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-tag" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-text-bold">话题标签</view>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey">
          <text class="tn-padding-xs">多选</text>
          <text class="tn-icon-constellation"></text>
        </view>
      </view>
      
      <view class="tn-tag-content tn-margin tn-text-justify">
        <view v-for="(item, index) in tags" :key="index" class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[item.select ? `tn-bg-${item.color}--light tn-color-${item.color}` : 'tn-bg-gray--light tn-color-gray--dark']"  @click="handleTagsClick(index)">
          <text :class="['tn-padding-right-xs tn-icon-' + item.icon]"></text> {{ item.title }}
        </view>
      </view>
      
      <!-- 悬浮按钮-->
      <view class="tn-flex tn-footerfixed">
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
          <tn-button backgroundColor="#3668fc" padding="40rpx 0" width="70%" fontBold @tap="upload">
            <!-- <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text> -->
            <text class="tn-color-white">发 布 日 签</text>
            <!-- <text class="tn-icon-camera tn-padding-left-xs tn-color-black"></text> -->
          </tn-button>
          <view class="tn-padding-xs tn-text-sm">
            <text class="tn-icon-tip-fill tn-color-gray tn-padding-right-xs"></text> 
            <text class="tn-color-gray">日签 +20 积分</text>
          </view>
        </view>
      </view>
      
    </view>
    
    <view class='tn-tabbar-height'></view>
    
	</view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
    name: 'TemplateEdit',
    mixins: [template_page_mixin],
		data() {
			return {
        tags: [
          {
            icon: "topic",
            title: "原神",
            color: 'red',
            select: false
          },
          {
            icon: "topic",
            title: "LOL",
            color: 'cyan',
            select: false
          },
          {
            icon: "topic",
            title: "图鸟",
            color: 'blue',
            select: false
          },
          {
            icon: "topic",
            title: "科技",
            color: 'green',
            select: false
          },
          {
            icon: "topic",
            title: "免费",
            color: 'orange',
            select: false
          },
          {
            icon: "topic",
            title: "前端",
            color: 'purplered',
            select: false
          },
          {
            icon: "topic",
            title: "后端",
            color: 'purple',
            select: false
          },
          {
            icon: "topic",
            title: "UI设计",
            color: 'orangered',
            select: false
          },
          {
            icon: "topic",
            title: "求助",
            color: 'orangeyellow',
            select: false
          },
          {
            icon: "topic",
            title: "吃货",
            color: 'brown',
            select: false
          },
          {
            icon: "topic",
            title: "萌宠",
            color: 'grey',
            select: false
          }
        ],
				action: 'https://www.hualigs.cn/api/upload',
				// action: '',
				formData: {
				  apiType: 'this,ali',
				  token: 'dffc1e06e636cff0fdf7d877b6ae6a2e',
				  image: null
				},
				fileList: [{url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699066-assets/web-upload/f7a37b29-506a-4e79-937f-826334902bb4.jpeg'},{url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699053-assets/web-upload/8645ea3a-e0a9-4422-8364-cc5ede305c9f.jpeg'}],
				showUploadList: true,
				customBtn: false,
				autoUpload: true,
				showProgress: false,
				deleteable: true,
				customStyle: false,
				maxCount: 4,
				disabled: false,
			}
		},
		onLoad() {

		},
		methods: {
      // 处理标签点击事件
      handleTagsClick(index) {
        this.tags[index].select = !this.tags[index].select
      },
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // 手动上传文件
      upload() {
        this.$refs.imageUpload.upload()
      },
      // 手动清空列表
      clear() {
        this.$refs.imageUpload.clear()
      },
      // 图片拖拽重新排序
      onSortList(list) {
        console.log(list);
      },
		}
	}
</script>

<style lang="scss" scoped>
	.template-edit{
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
  
  /* 底部悬浮按钮 start*/
  .tn-tabbar-height {
  	min-height: 180rpx;
  	height: calc(220rpx + env(safe-area-inset-bottom) / 2);
    height: calc(220rpx + constant(safe-area-inset-bottom));
  }
  .tn-footerfixed {
    position: fixed;
    width: 100%;
    bottom: calc(30rpx + env(safe-area-inset-bottom));
    z-index: 1024;
    box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);
    
  }
  /* 底部悬浮按钮 end*/
  
  /* 标签内容 start*/
  .tn-tag-content {
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
</style>
