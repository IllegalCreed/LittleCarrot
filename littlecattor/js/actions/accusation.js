import API from '../configs/APIConfig';

// 获取举报类型列表
export function getAccusationTypeList() {
    return {
        type: 'getAccusationTypeListAction',
        payload: {
            request: {
                url: API.getAccusationTypeList,
                method: 'post',
                data: {
                }
            }
        }
    }
}

// 重置获取举报类型列表状态
export function resetGetAccusationTypeListState() {
    return {
        type: 'resetGetAccusationTypeListState',
    }
}

// 举报
export function addAccusation(notice_id, category_id, img_url_arr) {
    return {
        type: 'addAccusationAction',
        payload: {
            request: {
                url: API.addAccusation,
                method: 'post',
                data: {
                    notice_id,
                    category_id,
                    img_url_arr
                }
            }
        }
    }
}

// 重置举报状态
export function resetAddAccusationState() {
    return {
        type: 'resetAddAccusationState',
    }
}

// 获取我的举报列表
export function getMyAccusationList(page_index, page_size) {
    return {
        type: 'getMyAccusationListAction',
        payload: {
            request: {
                url: API.getMyAccusationList,
                method: 'post',
                data: {
                    page_index,
                    page_size
                }
            }
        }
    }
}

// 重置获取我的举报列表状态
export function resetGetMyAccusationListState() {
    return {
        type: 'resetGetMyAccusationListState',
    }
}

// 获取举报详情
export function getAccusationDetail(report_id) {
    return {
        type: 'getAccusationDetailAction',
        payload: {
            request: {
                url: API.getAccusationDetail,
                method: 'post',
                data: {
                    report_id
                }
            }
        }
    }
}

// 重置获取举报详情状态
export function resetGetAccusationDetailState() {
    return {
        type: 'resetGetAccusationDetailState',
    }
}