import API from 'APIConfig';

export function sendSMS(phone) {
    return {
        type: 'sendSMSAction',
        payload: {
            request: {
                url: API.sendSMS,
                method: 'post',
                data: {
                    phone,
                }
            }
        }
    }
}

export function register(phone, sms_code, pwd) {
    return {
        type: 'registerAction',
        payload: {
            request: {
                url: API.register,
                method: 'post',
                data: {
                    phone,
                    sms_code,
                    pwd
                }
            }
        }
    }
}

export function login(phone, pwd) {
    return {
        type: 'loginAction',
        payload: {
            request: {
                url: API.login,
                method: 'post',
                data: {
                    phone,
                    pwd
                }
            }
        }
    }
}

export function resetLoginState() {
    return {
        type: 'resetLoginState',
    }
}

export function updateUserInfo(avatar_url, nickname, sex, height, weight, bust, waist, hips, shoe_size, description) {
    return {
        type: 'updateUserInfoAction',
        payload: {
            request: {
                url: API.updateUserInfo,
                method: 'post',
                data: {
                    avatar_url, 
                    nickname, 
                    sex, 
                    height, 
                    weight, 
                    bust, 
                    waist, 
                    hips, 
                    shoe_size, 
                    description
                }
            }
        }
    }
}

export function resetUpdateUserInfoState() {
    return {
        type: 'resetUpdateUserInfoState',
    }
}

export function getUserInfo() {
    return {
        type: 'getUserInfoAction',
        payload: {
            request: {
                url: API.getUserInfo,
                method: 'post',
                data: {
                }
            }
        }
    }
}

export function resetGetUserInfoState() {
    return {
        type: 'resetGetUserInfoState',
    }
}