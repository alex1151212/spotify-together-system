import axios, { AxiosError } from "axios";

interface ICommonError {
  statusCode: number;
  message: string;
}

const scopes = `streaming user-read-playback-position user-modify-playback-state user-read-playback-state user-read-private user-read-email`;
const redirectUri = `${process.env.HOST_URL}`;
export const spotifyAuthURL = `${process.env.SPOTIFY_ENDPOINT_URL}?client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&response_type='code'&state=123`;

const axiosSpotifyInstance = axios.create({
  baseURL: `${process.env.BACKEND_URL}${process.env.API_PATH}`,
  timeout: 60 * 1000 * 60,
  headers: {
    // Authorization: "Bearer develop",
    Authorization: "Bearer 1d41a216-5e7d-421c-a067-504d01bfa47b",
  },
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

axios.defaults.baseURL = `${process.env.BACKEND_URL}${process.env.API_PATH}`;

export { axiosSpotifyInstance };
