
import { ISearchQueryType } from "@/utils/common-type";
import { api } from "./api";
import { axiosSpotifyInstance } from "./axios";


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



export { skipToNext, skipToPre };
