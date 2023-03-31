import request from "@/utils/request"

export function userLogin(params) {
	return request.post("user/login", params).then(res => {
		return res.data
	})
}

export function userInfo() {
	return request.get("user/info").then(res => {
		return res.data
	})
}

export function updateUserInfo(params) {
	return request.put("user/update", params).then(res => {
		return res.data
	})
}