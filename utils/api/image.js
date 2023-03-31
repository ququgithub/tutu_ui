import request from "@/utils/request"

export function seriesList(params) {
	return request.get("img/series", {
		params: params,
	}).then(res => {
		return res.data
	})
}