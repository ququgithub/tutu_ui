import request from "@/utils/request"

export function seriesList(params) {
	return request.get("img/series", {
		params: params,
	}).then(res => {
		return res.data
	})
}

export function imageList(params) {
	return request.get("img/list", {
		params: params
	}).then(res => {
		return res.data
	})
}

export function imageItemList(params) {
	return request.get("img/item", {
		params: params
	}).then(res => {
		return res.data
	})
}

export function imageCategoryList(params) {
	return request.get("img/category", {
		params: params
	}).then(res => {
		return res.data
	})
}

export function imageDownLoad(params) {
	return request.get("img/download", {
		params: params
	}).then(res => {
		return res.data
	})
}