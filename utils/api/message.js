import request from "@/utils/request"

export function templateSubscribe(params) {
	return request.post("msg/template/subscribe", params).then(res => {
		return res.data
	})
}
