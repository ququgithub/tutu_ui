import request from "@/utils/request"

export function emoGroupList(params) {
	return request.get("emo/group", {
		params: params,
	}).then(res => {
		return res.data
	})
}

export function emoImageList(params) {
	return request.get("emo/image", {
		params: params,
	}).then(res => {
		return res.data
	})
}