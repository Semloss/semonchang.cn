/*
 * @Description: error code
 * @Author: semonchang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-11 18:28:08
 * @LastEditTime: 2019-04-13 17:07:26
 */

const DEFAULT_ERROR_MSG = "Unknow Error!";
//存放被定义过后的error对象
const errorCode = {};

errorCode.SUCCESS = defineCode(0, "Success");

errorCode.HTTP_TIME_OUT = defineCode(999, "TimeOut");

errorCode.UNKNOW_ERROR = defineCode(1000, "UnKonw Error");

errorCode.ERROR_PARSE = defineCode(1001, "Error Type");

errorCode.DUPLICATE_REQUEST = defineCode(1002, "Too Fast, Try Again Later");

errorCode.HTTP_UNAUTHORIZED = defineCode(1003, "Unauthorized");

errorCode.HTTP_FORBIDDEN = defineCode(1004, "Forbidden");

errorCode.HTTP_NOT_FOUND = defineCode(404, "Not Found");

errorCode.HTTP_CROSS_DOMAIN = defineCode(1006, "Cross domain is not supported");

errorCode.HTTP_NETWORK_ERR = defineCode(1007, "Network Error");

function defineCode(code, message) {
  if (errorCode[code]) {
    //不允许有重复到错误吗
    throw new Error(`duplicated code: ${code}`);
  }
  //将code的错误码添加到error msg当中，方便调试
  errorCode[code] = message || DEFAULT_ERROR_MSG;
  return code;
}

errorCode.getCode = function getCode(code) {
  if (errorCode[code]) {
    return `${code} ${errorCode[code]}`;
  }
  return `${errorCode.UNKNOW_ERROR}${errorCode[errorCode.UNKNOW_ERROR]}`;
};

//errorCode的数据结构
// { '0': 'Success',
//   '404': 'Not Found',
//   '999': 'TimeOut',
//   '1000': 'UnKonw Error',
//   '1001': 'Error Type',
//   '1002': 'Too Fast, Try Again Later',
//   '1003': 'Unauthorized',
//   '1004': 'Forbidden',
//   '1006': 'Cross domain is not supported',
//   '1007': 'Network Error',
//   SUCCESS: 0,
//   HTTP_TIME_OUT: 999,
//   UNKNOW_ERROR: 1000,
//   ERROR_PARSE: 1001,
//   DUPLICATE_REQUEST: 1002,
//   HTTP_UNAUTHORIZED: 1003,
//   HTTP_FORBIDDEN: 1004,
//   HTTP_NOT_FOUND: 404,
//   HTTP_CROSS_DOMAIN: 1006,
//   HTTP_NETWORK_ERR: 1007,
//   getCode: [Function: getCode] }
//  只返回一个code+msg的字符串，用于调试
