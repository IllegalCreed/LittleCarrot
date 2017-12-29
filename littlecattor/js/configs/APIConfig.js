/**
 * @providesModule APIConfig
 */

export default API = {
  rootPath: 'http://47.93.223.173:6183/api/',

  sendSMS: 'sms/sendSMS',
  register: 'user/register',
  login: 'user/login',
  updateUserInfo: 'user/updateUserInfo',
  getUserInfo: 'user/getUserInfo',

  getCircularList: 'notice/getList',
  getCircularTags: 'notice/getTagList',
  getCircularDetail: 'notice/getDetail',
  publishCircular: 'notice/addNotice',

  getAccusationTypeList: 'report/getReportCategory',
  addAccusation:'report/addReport',

  getExposureList:'exposure/getList',
  getExposureDetail:'exposure/getDetail',
  publishExposure:'exposure/addExposure',
  supportExposure:'exposure/setMyAttitude',
  searchWechat:'exposure/dishonestySearch',
}