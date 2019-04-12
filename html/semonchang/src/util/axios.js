/*
 * @Description: In User Settings Edit
 * @Author: semonchang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-11 17:20:54
 * @LastEditTime: 2019-04-12 12:05:37
 */

import axios from "axios";
import Qs from "qs";
import errorCode from "./error_code";

const axiosHttper = {
  //异常处理
  defaultErrorHandler: null,
  baseURL: "http://132.232.71.113",
  //如果跨域的话，是否将cookie一块带上
  withCredentials: false,
  //如果不同带页面发送同样带请求，可能会导致数据错乱
  preventRepatPost: true,
  timeOut: 30000,
  updateTimeOut: 100000
};

const axiosinstance = axios.create({
  baseURL: axiosHttper.baseURL,
  timeout: axiosHttper.timeOut
});

//记录发送中带请求，避免post重复，导致post同时修改数据，导致数据出问题
const urlRecorder = {
  urlList: [],

  /**
   *
   * @param {string} config: config.method, config.url 请求地址和方法，做记录
   * 添加一个请求
   */
  add(config) {
    if (
      axiosHttper.preventRepatPost &&
      config.method.toUpperCase() === "POST"
    ) {
      //去掉后面带时间戳
      let url = config.url.replace(/[&?]_=\d+/, "");
      if (!url.includes("//")) {
        url = axiosHttper.baseURL + url;
      }
      if (this.urlList.includes(url)) {
        const code = errorCode.DUPLICATE_REQUEST;
        const error = new Error(errorCode.getCodeData(code).message);
        error.code = code;
        return handleError(config, error);
      }
      this.urlList.push(url);
    }
    return Promise.resolve();
  },

  /**
   *
   * @param {object} config
   * 移除一个请求
   */
  remove(config) {
    if (
      axiosHttper.preventRepatPost &&
      config.method.toUpperCase() === "POST"
    ) {
      // 去掉后面加带时间戳
      const url = config.url.replace(/[&?]_=\d+/, "");
      const index = this.urlList.indexOf(url);
      if (index >= 0) {
        this.urlList.splice(index, 1);
      } else {
        console.error(`the url [${url}] has in record`, this.urlList);
      }
    }
  }
};

/**
 *
 * @param {string} url :给url添加一个时间，防止浏览器缓存请求
 */
function addVersion(url) {
  return url.includes("?")
    ? `${url}&_=${Date.now()}`
    : `${url}?_=${Date.now()}`;
}

/**
 *
 *
 * @param {object} config : request config post/get/url
 * @returns axios Instance
 */
async function commonSend(config) {
  const CORS_TYPES = [
    "text/plain",
    "multipart/form-data",
    "application/x-www-form-urlencoded"
  ];
  if (
    config.withCredentials &&
    !CORS_TYPES.includes(config.headers["Content-Type"])
  ) {
    console.error(
      `Not support CORS with Content-Type ${config.headers["Content-Type"]}`
    );
  }
  await urlRecorder.add(config);
  config.url = addVersion(config.url);
  return axiosinstance(config);
}

axiosHttper.post = function axiosPost(
  url,
  data = {},
  { timeOut, withCredentials } = {}
) {
  return commonSend({
    method: "POST",
    url,
    data: Qs.stringify(data),
    //
    timeout: timeOut || axiosHttper.timeOut,
    withCredentials: withCredentials || axiosHttper.withCredentials
  });
};

axiosHttper.get = function axiosGet(
  url,
  params = {},
  { timeOut, withCredentials } = {}
) {
  return commonSend({
    method: "GET",
    url,
    params,
    timeout: timeOut || axiosHttper.timeout,
    withCredentials: withCredentials || axiosHttper.withCredentials,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

/**
 *
 *
 * @param {object} config request config
 * @param {objetct} result response
 */
function handleError(config, result) {
  let err;
  if (result instanceof Error) {
    err = result;
  } else {
    err = new Error(result.message);
    err.data = result.data;
    err.code = result.code;
  }

  if (config && axiosHttper.defaultErrorHandler) {
    err.url = config.url;
    axiosHttper.defaultErrorHandler(err);
    err.processed = true;
  } else {
    console.log(config);
    console.log(err);
  }
  return Promise.reject(err);
}

// need upload file interface

axiosInstance.interceptors.response.use(
  handleResponseSuccess,
  handleResponseFail
);

/**
 *对返回的数据进行拦截处理
 *
 * @param {*} response
 */
function handleResponseSuccess(response) {
  urlRecorder.remove(response.config);
  if (typeof response.data.code !== "number") {
    console.error("can not parse from response");
    let result = {
      data: {},
      code: errorCode.ERROR_PARSE
    };
    return handleError(response.config, result);
  }
  const result = getResponse(response.data);
  if (result.code === 0) {
    return result.data;
  }
  result.message = errorCode.getCodeMessage(result.code);
  return handleError(response.config, result);
}

function getResponse(result) {
  if (typeof result.code !== "number") {
    return {
      data: {},
      code: errorCode.ERROR_PARSE,
      message: errorCode.getCodeMessage(errorCode.ERROR_PARSE)
    };
  }
}
export default axiosHttper;
