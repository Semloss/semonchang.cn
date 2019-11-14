/*
 * @Description: In User Settings Edit
 * @Author: semonchang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-11 17:20:54
 * @LastEditTime: 2019-04-13 17:13:38
 * @服务器返回的数据类似于这样{data: {openid:'HA72392HH'}, code: 0} //0 == 正确返回，!= 0 表示错误
 * @网页端从errorCode当中获取code所表示的msg，并展示出来提供给用户或者开发者
 */

import axios from "axios";
import Qs from "qs";
import errorCode from "./error_code";

const http = {
  //异常处理
  defaultErrorHandler: null,
  // baseURL: "http://132.232.71.113",
  //如果跨域的话，是否将cookie一块带上
  withCredentials: false,
  //如果不同带页面发送同样带请求，可能会导致数据错乱
  preventRepatPost: true,
  timeOut: 30000,
  updateTimeOut: 100000
};

const axiosInstance = axios.create({
  baseURL: http.baseURL,
  timeout: http.timeOut
});

axiosInstance.interceptors.response.use(
  handleResponseSuccess,
  handleResponseFail
);

//记录发送中带请求，避免post重复，导致post同时修改数据，导致数据出问题
const urlRecorder = {
  urlList: [],

  /**
   *
   * @param {string} config: config.method, config.url 请求地址和方法，做记录
   * 添加一个请求
   */
  add(config) {
    if (http.preventRepatPost && config.method.toUpperCase() === "POST") {
      //去掉后面带时间戳
      let url = config.url.replace(/[&?]_=\d+/, "");
      if (!url.includes("//")) {
        url = http.baseURL + url;
      }
      if (this.urlList.includes(url)) {
        const code = errorCode.DUPLICATE_REQUEST;
        const error = new (errorCode.getCode(code)).message();
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
    if (http.preventRepatPost && config.method.toUpperCase() === "POST") {
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
  return axiosInstance(config);
}

http.post = function axiosPost(
  url,
  data = {},
  { timeOut, withCredentials } = {}
) {
  return commonSend({
    method: "POST",
    url,
    data: Qs.stringify(data),
    //
    timeout: timeOut || http.timeOut,
    withCredentials: withCredentials || http.withCredentials
  });
};

http.get = function axiosGet(
  url,
  params = {},
  { timeOut, withCredentials } = {}
) {
  return commonSend({
    method: "GET",
    url,
    params,
    timeout: timeOut || http.timeout,
    withCredentials: withCredentials || http.withCredentials,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

/**
 *
 *
 * @param {object} config request config
 * @param {string} errmsg 只需要传递过来msg，msg中带有错误码
 */
function handleError(config, errmsg) {
  let err = new Error(errmsg);
  if (config && http.defaultErrorHandler) {
    http.defaultErrorHandler(err);
  } else {
    console.log(err);
  }
  return Promise.reject(err);
}

/**
 *对返回的数据进行拦截处理
 *
 * @param {*} response
 */
function handleResponseSuccess(response) {
  urlRecorder.remove(response.config);
  if (typeof response.data.code !== "number") {
    return handleError(
      response.config,
      errorCode.getCode(errorCode.UNKNOW_ERROR)
    );
  }
  if (response.result.code === 0) {
    return response.result.data;
  }
  return handleError(response.config, errorCode.getCode(response.result.code));
}

function handleResponseFail(error) {
  urlRecorder.remove(error.config);
  let result;
  if (error.response) {
    result =
      errorCode.getCode(error.response.status) || errorCode.HTTP_NETWORK_ERR;
  } else if (error.message.startsWith("timeout of ")) {
    // 请求没有发出去，本地产生的错误
    result = errorCode.getCode(errorCode.HTTP_TIME_OUT);
  } else if (
    !error.config.url.startsWith(window.location.origin) &&
    error instanceof Error
  ) {
    result = errorCode.getCode(errorCode.HTTP_CROSS_DOMAIN);
  } else if (error instanceof Error) {
    result = errorCode.getCode(errorCode.HTTP_NETWORK_ERR);
  } else {
    result = errorCode.getCode(errorCode.HTTP_NETWORK_ERR);
  }
  return handleError(error.config, result);
}

export default http;
