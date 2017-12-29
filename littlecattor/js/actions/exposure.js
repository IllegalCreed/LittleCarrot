import API from 'APIConfig';

// 获取曝光列表
export function getExposureList(page_index, page_size) {
    return {
        type: 'getExposureListAction',
        payload: {
            request: {
                url: API.getExposureList,
                method: 'post',
                data: {
                    page_index,
                    page_size
                }
            }
        }
    }
}

// 重置获取曝光列表状态
export function resetGetExposureListState() {
    return {
        type: 'resetGetExposureListState',
    }
}

// 发布曝光
export function publishExposure(title, img_url_arr, content, wx, tag) {
    return {
        type: 'publishExposureAction',
        payload: {
            request: {
                url: API.publishExposure,
                method: 'post',
                data: {
                    title,
                    img_url_arr,
                    content,
                    wx,
                    tag,
                }
            }
        }
    }
}

// 重制发布曝光状态
export function resetPublishExposureState() {
    return {
        type: 'resetPublishExposureState',
    }
}

// 获取曝光详情
export function getExposureDetail(exposure_id) {
    return {
        type: 'getExposureDetailAction',
        payload: {
            request: {
                url: API.getExposureDetail,
                method: 'post',
                data: {
                    exposure_id,
                }
            }
        }
    }
}

// 重制获取曝光详情状态
export function resetGetExposureDetailState() {
    return {
        type: 'resetGetExposureDetailState',
    }
}

// 支持曝光
export function supportExposure(exposure_id, type) {
    return {
        type: 'supportExposureAction',
        payload: {
            request: {
                url: API.supportExposure,
                method: 'post',
                data: {
                    exposure_id,
                    type
                }
            }
        }
    }
}

// 重制支持曝光状态
export function resetSupportExposureState() {
    return {
        type: 'resetSupportExposureState',
    }
}
