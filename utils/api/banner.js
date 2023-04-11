import request from "@/utils/request"

export function bannerList(params) {
	return request.get("banner/list", {
		params: params,
	}).then(res => {
		return res.data
	})
}