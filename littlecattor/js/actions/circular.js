import API from 'APIConfig';

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

export function resetGetCircularListState() {
    return {
        type: 'resetGetCircularListState',
    }
}

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

export function resetGetCircularTagListState() {
    return {
        type: 'resetGetCircularTagListState',
    }
}

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

export function resetPublishCircularState() {
    return {
        type: 'resetPublishCircularState',
    }
}

