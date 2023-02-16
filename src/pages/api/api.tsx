import { Method as M } from "axios";

const Method = {
  POST: "POST" as M,
  GET: "GET" as M,
  PUT: "PUT" as M,
  PATCH: "PATCH" as M,
  DELETE: "DELETE" as M,
};

export const api = {
  // bravelog
  login: { url: () => "frontend/user/login", method: Method.POST },
  logout: { url: () => "frontend/user/logout", method: Method.GET },
  
};
