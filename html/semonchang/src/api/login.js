import { post } from "../util/axios";

export const login = (id, passwd) => {
  return post("/account/login", { id, passwd });
};
