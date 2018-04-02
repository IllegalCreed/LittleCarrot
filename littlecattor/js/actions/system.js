import API from 'APIConfig';

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