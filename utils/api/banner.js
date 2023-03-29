import request from "@/utils/request"

export function list(params) {
	return request.get("banner/list", {
		params: params,
	}).then(res => {
		return res.data
	})
}