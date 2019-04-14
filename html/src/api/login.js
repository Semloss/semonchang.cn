import http from "../util/axios";

export const login = (id, passwd) => {
  return http.get("api/account/login", { id, passwd });
};
