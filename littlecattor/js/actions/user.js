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