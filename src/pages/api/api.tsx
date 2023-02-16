import { Method as M } from "axios";

const Method = {
  POST: "POST" as M,
  GET: "GET" as M,
  PUT: "PUT" as M,
  PATCH: "PATCH" as M,
  DELETE: "DELETE" as M,
};

export const api = {
  getMeProfile: { url: () => "me", method: Method.GET },
  getMePlayer: { url: () => "me/player", method: Method.GET },
  skipToNext: {
    url: (deviceId?: string) => `me/player/next?${deviceId}`,
    method: Method.POST,
  },
  skipToPre: {
    url: () => `me/player/previos`,
    method: Method.POST,
  },

  searchItems: {
    url: () => `search`,
    method: Method.GET,
  },
};
