import { templateSubscribe } from '@/utils/api/message.js'
import {	userLogin } from '@/utils/api/user'
export default {
	downloadImage: (url) => {
		wx.downloadFile({
			url: url,
			success(res) {
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success(res) {
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						})
					},
					fail(res) {
						uni.showToast({
							icon: 'none',
							title: '保存失败'
						})
					}
				})
			},
			fail(res) {
				uni.showToast({
					icon: 'none',
					title: '文件下载失败'
				})
			}
		})
	},
	imagePreview: (imageUrl) => {
		uni.previewImage({
			urls: [imageUrl],
			current: 0,
		})
	},
	showToast: (title, time = 3000) => {
		uni.showToast({
			title: title,
			duration: time,
			icon: "none"
		})
	},
	templateSubscribe: (template, url) => {
		uni.requestSubscribeMessage({
			tmplIds: [template],
			success(res) {
				if (res.errMsg == 'requestSubscribeMessage:ok' && res[template] == 'accept') {
					templateSubscribe({
						template_id: template
					}).then(res => {
						if (res.code == 1 && url != '') {
							wx.downloadFile({
								url: url,
								success(res) {
									wx.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success(res) {
											uni.showToast({
												icon: 'none',
												title: '保存成功'
											})
										},
										fail(res) {
											uni.showToast({
												icon: 'none',
												title: res.errMsg == 'saveImageToPhotosAlbum:fail cancel' ? '取消下载' : '下载失败',
											})
										}
									})
								},
								fail(res) {
									uni.showToast({
										icon: 'none',
										title: '文件下载失败'
									})
								}
							})
							return
						}
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					})
					return
				} 
				uni.showToast({
					icon: 'none',
					title: '请先订阅',
				})
			},
			fail(res) {
				uni.showToast({
					title: '订阅失败',
					icon: 'none',
					duration: 3000
				})
			}
		})
	},
	login: (channel) => {
		uni.navigateTo({
			url:'/pageA/login/login'
		})
	},
	shareImage: (url) => {
		wx.downloadFile({
			url: url,
			success: (res) => {
				wx.showShareImageMenu({
					path: res.tempFilePath,
					success() {
						uni.showToast({
							icon: 'none',
							title: '分享成功'
						})
					},fail(res) {
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '分享失败'
						})
					}
				})
			}
		})
	}
}