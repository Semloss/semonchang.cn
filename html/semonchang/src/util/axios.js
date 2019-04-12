/*
 * @Description: In User Settings Edit
 * @Author: semonchang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-11 17:20:54
 * @LastEditTime: 2019-04-12 18:45:48
 * @服务器返回的数据类似于这样{data: {openid:'HA72392HH'}, code: 0} //0 == 正确返回，!= 0 表示错误
 * @网页端从errorCode当中获取code所表示的msg，并展示出来提供给用户或者开发者
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

const axiosInstance = axios.create({
  baseURL: axiosHttper.baseURL,
  timeout: axiosHttper.timeOut
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
  return axiosInstance(config);
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
 * @param {errorCode} result code 错误码
 */
function handleError(config, code) {
  let err = new Error(errorCode.getCode(code).message);
  if (config && axiosHttper.defaultErrorHandler) {
    err.url = config.url;
    axiosHttper.defaultErrorHandler(err);
    err.processed = true;
  } else {
    console.log(err);
  }
  return Promise.reject(err);
}

// need upload file interface

// axiosInstance.interceptors.response.use(
//   handleResponseSuccess,
//   handleResponseFail
// );

/**
 *对返回的数据进行拦截处理
 *
 * @param {*} response
 */
function handleResponseSuccess(response) {
  urlRecorder.remove(response.config);
  if (typeof response.data.code !== "number") {
    console.error("can not parse from response");
    return handleError(response.config, errorCode.ERROR_PARSE.code);
  }
  const result = getResponse(response.data);
  if (result.code === 0) {
    return result.data;
  }
  return handleError(response.config, result.code);
}

function getResponse(result) {
  if (typeof result.code !== "number") {
    return {
      data: {},
      code: errorCode.ERROR_PARSE.code,
      message: errorCode.ERROR_PARSE.message
    };
  }
  return {
    data: result.data,
    code: result.code,
    message: errorCode.getCode(result.data).message
  };
}

function handleResponseFail(error) {
  urlRecorder.remove(error.config);
  let result;
  if (error.response) {
    // 请求已发送，响应中返回了非2xx的错误码，包括304等
    const codeMap = {
      401: errorCode.HTTP_UNAUTHORIZED,
      403: errorCode.HTTP_FORBIDDEN,
      404: errorCode.HTTP_NOT_FOUND
    };
    const code = codeMap[error.response.status] || errorCode.HTTP_NETWORK_ERR;
    const responseData = getResponse(error.response.data);
    result = fillErrorMessage(
      code,
      `${error.response.status} ${error.response.statusText}`,
      responseData
    );
  } else if (error.message.startsWith("timeout of ")) {
    // 请求没有发出去，本地产生的错误
    result = fillErrorMessage(errorCode.HTTP_TIME_OUT, "no response");
  } else if (
    !error.config.url.startsWith(window.location.origin) &&
    error instanceof Error
  ) {
    error.code = errorCode.HTTP_CROSS_DOMAIN;
    error.message =
      errorCode.getCode(errorCode.HTTP_CROSS_DOMAIN).message ||
      `Can not access from ${window.location.origin}!`;
    result = error;
  } else if (error instanceof Error) {
    error.code = errorCode.HTTP_NETWORK_ERR;
    error.message =
      errorCode.getCodeData(errorCode.HTTP_NETWORK_ERR).message ||
      error.message;
    result = error;
  } else {
    result = fillErrorMessage(errorCode.HTTP_NETWORK_ERR, error.message);
  }
  return handleError(error.config, result.code);
}

function fillErrorMessage(code, message, data = null) {
  return {
    data,
    code,
    message: errorCode.getCodeData(code).message || message
  };
}
export default axiosHttper;
