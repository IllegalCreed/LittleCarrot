import API from 'APIConfig';

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