import axios, { AxiosError } from "axios";
import Cookie from "./cookie";

interface ICommonError {
  statusCode: number;
  message: string;
}

const axiosSpotifyInstance = axios.create({
  baseURL: `${process.env.SPOTIFY_API_URL}`,
  headers: {
    Authorization: `Bearer `,
  },
  timeout: 60 * 1000 * 60,
});

axiosSpotifyInstance.interceptors.request.use(
  (config) => {
    if (config.params) {
      // 如果需要轉大寫再用下面這行
      // config.params = pascalCaseKeys(config.params);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosSpotifyInstance.interceptors.response.use(
  (response) => {
    // if (response.data) {
    //   response.data = camelCaseKeys(response.data);
    // }
    return response;
  },
  (error: AxiosError<ICommonError>) => {
    console.log(error);
    let message = "";
    if (error && error.response) {
      switch (error.response.data.statusCode) {
        case 401:
          if (location.pathname.includes("/management")) {
            location.pathname = "/training/bu/";
          }
          break;
      }
    }
    // useAlert().addMessage({ text: message, type: "error" });
    return Promise.reject({
      ...error,
      message: { text: message, type: "error" },
    });
  }
);

axios.defaults.baseURL = `${process.env.SPOTIFY_API_URL}`;

export { axiosSpotifyInstance };
