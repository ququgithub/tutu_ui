<template>
  <view class="">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center ">
			  <text class="tn-text-bold tn-text-xl tn-color-black">使用帮助</text>
			</view>
    </tn-nav-bar>
    
    
    <view class="tn-margin tn-text-center" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <rich-text :nodes="content"></rich-text>
    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import { docShow } from '@/utils/api/doc.js'
  export default {
    name: 'TemplateAbout',
    mixins: [template_page_mixin],
    data(){
      return {
				uid: "",
				content: {},
			}
    },
		onLoad(params) {
			this.uid = params.uid || ""
			this.getDocContent()
		},
    methods: {
			getDocContent() {
				docShow({uid: this.uid}).then(res => {
					console.log(res)
					this.content = res.content
				})
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
	.tn-text-center {
		text-align: left;
	}
</style>
