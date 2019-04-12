/*
 * @Description: error code
 * @Author: semonchang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-11 18:28:08
 * @LastEditTime: 2019-04-12 18:36:54
 */

const DEFAULT_ERROR_MSG = "Unknow Error!";
//存放被定义过后的error对象
const errorCode = {};
errorCode.SUCCESS = defineCode(0, "success");
errorCode.UNKNOW_ERROR = defineCode(999, "unKonw Error");

function defineCode(code, message) {
  if (errorCode[code]) {
    //不允许有重复到错误吗
    throw new Error(`duplicated code: ${code}`);
  }
  //将code的错误码添加到error msg当中，方便调试
  errorCode[code] = {
    message: `($code)${message}` || `($code)${DEFAULT_ERROR_MSG}`,
    code: code
  };
  return code;
}

//errorCode[code] = {message, code}
errorCode.getCode = function getCode(code) {
  if (errorCode[code]) {
    return errorCode[code];
  }
  return errorCode.UNKNOW_ERROR;
};
