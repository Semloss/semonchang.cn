import axios from "axios";
import router from "../router";

const httpRequestor = axios.create({
  timeout: 3000, //请求超时时间
  baseURL: "http:132.232.71.113"
});

//添加request拦截器
httpRequestor.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

//拦截响应
httpRequestor.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  error => {
    if (error.response && error.response.statas == 404) {
      //404返回固定页面
      router.push("/");
    }
  }
);

export function get(url, data = {}) {
  data.t = new Date().getTime();
  return httpRequestor({
    url: url,
    method: "get",
    headers: {},
    params: data
  });
}

export function post(url, data = {}) {
  let sendObject = {
    url: url,
    method: "post",
    headers: {
      //可能不一定符合要求，但是可以根据需求改
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: data
  };
  sendObject.data = JSON.stringify(data);
  return httpRequestor(sendObject);
}

export { httpRequestor };
