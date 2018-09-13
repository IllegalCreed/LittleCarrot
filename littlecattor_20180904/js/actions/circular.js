import API from 'APIConfig';

// 获取通告列表
export function getCircularList(page_index, page_size) {
    return {
        type: 'getCircularListAction',
        payload: {
            request: {
                url: API.getCircularList,
                method: 'post',
                data: {
                    page_index,
                    page_size
                }
            }
        }
    }
}

// 重置获取通告列表状态
export function resetGetCircularListState() {
    return {
        type: 'resetGetCircularListState',
    }
}

// 获取通告标签列表
export function getCircularTagList() {
    return {
        type: 'getCircularTagListAction',
        payload: {
            request: {
                url: API.getCircularTags,
                method: 'post',
                data: {
                }
            }
        }
    }
}

// 重制获取通告标签列表状态
export function resetGetCircularTagListState() {
    return {
        type: 'resetGetCircularTagListState',
    }
}

// 发布通告
export function publishCircular(price, content, tag_id, wx) {
    return {
        type: 'publishCircularAction',
        payload: {
            request: {
                url: API.publishCircular,
                method: 'post',
                data: {
                    price,
                    content,
                    tag_id,
                    wx
                }
            }
        }
    }
}

// 重制发布通告状态
export function resetPublishCircularState() {
    return {
        type: 'resetPublishCircularState',
    }
}

// 获取通告详情
export function getCircularDetail(notice_id) {
    return {
        type: 'getCircularDetailAction',
        payload: {
            request: {
                url: API.getCircularDetail,
                method: 'post',
                data: {
                    notice_id,
                }
            }
        }
    }
}

// 重制获取通告详情状态
export function resetGetCircularDetailState() {
    return {
        type: 'resetGetCircularDetailState',
    }
}

// 获取假通告列表
export function getFakeCircularList(page_index, page_size) {
    return {
        type: 'getFakeCircularListAction',
        payload: {
            request: {
                url: API.getCircularList,
                method: 'post',
                data: {
                    page_index,
                    page_size,
                    state: -1
                }
            }
        }
    }
}

// 重置获取假通告列表状态
export function resetGetFakeCircularListState() {
    return {
        type: 'resetGetFakeCircularListState',
    }
}

