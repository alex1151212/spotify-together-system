import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRedirectParams } from "@/utils/format";
import Cookie from "../api/cookie";
interface IProps {}

const SpotifyCallback: React.FunctionComponent<IProps> = () => {
  const router = useRouter();

  useEffect(() => {
    const params = getRedirectParams();
    if (params?.access_token) {
      Cookie.setCookie("accessToken", params?.access_token);
      router.replace("/");
    }

    //eslint-disable-next-line
  }, [router.isReady]);

  return <></>;
};

export default SpotifyCallback;
