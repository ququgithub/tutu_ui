export default {
	downloadImage: function(url) {
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
					},fail(res) {
						uni.showToast({
							icon: 'none',
							title: '保存失败'
						})
					}
				})
			},fail(res){
				uni.showToast({
					icon: 'none',
					title: '文件下载失败'
				})
			}
		})
	},
	showToast: function(title, time = 3000) {
			uni.showToast({
				title: title,
				duration: time,
				icon: "none"
			})
	},
}
