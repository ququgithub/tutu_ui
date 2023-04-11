import request from "@/utils/request"

export function groupList(params) {
	return request.get("doc/group", {
		params: params,
	}).then(res => {
		return res.data
	})
}

export function docShow(params) {
	return request.get("doc/show", {
		params: params,
	}).then(res => {
		return res.data
	})
}