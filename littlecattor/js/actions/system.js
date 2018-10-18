import API from '../configs/APIConfig';

export function updatePVCount(page_name) {
    return {
        type: 'updatePVCountAction',
        payload: {
            request: {
                url: API.updatePVCount,
                method: 'post',
                data: {
                    page_name,
                }
            }
        }
    }
}

export function getBanner(page_name) {
    return {
        type: 'getBannerAction',
        payload: {
            request: {
                url: API.getBanner,
                method: 'post',
                data: {
                }
            }
        }
    }
}