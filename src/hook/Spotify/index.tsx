import { api } from "@/pages/api";
import { axiosSpotifyInstance } from "../../pages/api/axios";

const skipToNext = (token: string, deviceId?: string) => {
  axiosSpotifyInstance
    .request({
      method: api.skipToNext.method,
      url: api.skipToNext.url(),
      params: deviceId,
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    .then((e) => {
      const { data } = e;
      console.log("Success");
    })
    .catch((error) => {
      console.log(error);
    });
};

const skipToPre = (token: string, deviceId?: string) => {
  axiosSpotifyInstance
    .request({
      method: api.skipToPre.method,
      url: api.skipToPre.url(),
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    .then((e) => {
      const { data } = e;
      console.log("Success");
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchItems = (
  token: string,
  q: string,
  type: "album" | "album,track" | "track" = "track",
  includeExternal?: string,
  limit?: number,
  market?: string,
  offset?: number
) => {
  return axiosSpotifyInstance
    .request({
      method: api.searchItems.method,
      url: api.searchItems.url(),
      params: {
        q: q,
        type: type,
      },
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    .then((e) => {
      const { data } = e;
      const { tracks } = data;
      return tracks;
    })
    .catch((error) => {
      console.log(error);
    });
};

export { skipToNext, skipToPre, searchItems };
