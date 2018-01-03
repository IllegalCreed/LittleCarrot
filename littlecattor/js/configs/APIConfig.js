/**
 * @providesModule APIConfig
 */

export default API = {
  rootPath: 'http://47.93.223.173:6183/api/',

  sendSMS: 'sms/sendSMS',
  register: 'user/register',
  login: 'user/login',
  resetPwd: 'user/resetPwd',
  updateUserInfo: 'user/updateUserInfo',
  getUserInfo: 'user/getUserInfo',
  getMyCircularList: 'user/getMyNoticeList',
  getMyExposureList: 'user/getMyExposureList',

  getCircularList: 'notice/getList',
  getCircularTags: 'notice/getTagList',
  getCircularDetail: 'notice/getDetail',
  publishCircular: 'notice/addNotice',

  getAccusationTypeList: 'report/getReportCategory',
  addAccusation:'report/addReport',
  getMyAccusationList:'report/getMyReportList',
  getAccusationDetail:'report/getReportDetail',

  getExposureList:'exposure/getList',
  getExposureDetail:'exposure/getDetail',
  publishExposure:'exposure/addExposure',
  supportExposure:'exposure/setMyAttitude',
  searchWechat:'exposure/dishonestySearch',
}