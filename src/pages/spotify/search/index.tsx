import useAxios from "@/hook/useAxios";
import { ISearchQueryType } from "@/utils/common-type";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Card,
  Container,
  Pagination,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import Cookie from "../../api/cookie";
import { ISearchResponseType, ISearchTracksType } from "./type";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [musicTrackData, setMusicTrackData] = useState<ISearchTracksType>();
  const [musicListPagination, setMusicListPagination] = useState<number>(1);
  const { sendRequest, isLoading } = useAxios();
  const musicListLimit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const searchMusics = (token: string, searchQuery: ISearchQueryType) => {
    sendRequest(
      {
        method: api.searchItems.method,
        url: api.searchItems.url(),
        params: {
          ...searchQuery,
          type: searchQuery.type || "track",
        },
        headers: {
          Authorization: `Bearer ` + token,
        },
      },
      (response: AxiosResponse<ISearchResponseType, any>) => {
        const { data } = response;
        setMusicTrackData(data?.["tracks"]);
      }
    );
  };

  const musicSearchInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(e.target.value);
  };

  const musicListPaginationHandler = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setMusicListPagination(value);
  };

  useEffect(() => {
    const accessToken = Cookie.getCookie("accessToken");
    if (accessToken) setToken(accessToken);
  }, [router.isReady]);

  useEffect(() => {
    if (token) {
      searchMusics(token, {
        q: searchInput,
        limit: 10,
        type: "track",
        offset: musicListPagination - 1,
      } as ISearchQueryType);
    }

    //eslint-disable-next-line
  }, [searchInput, musicListPagination]);

  return (
    <>
      <Container maxWidth="sm" className="spotify-search">
        <div className="spotify-search-input">
          <span className="spotify-search-input-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder={"想聽甚麼？"}
            onChange={musicSearchInputChangeHandler}
          />
        </div>
        <div className="spotify-search-music-list-wrapper">
          <div className="spotify-search-music-list">
            {musicTrackData && searchInput
              ? musicTrackData.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: "1em",
                      }}
                    >
                      <div className="spotify-search-music-list-item">
                        <Image
                          key={index}
                          src={item.album.images[2].url}
                          alt=""
                          width={item.album.images[2].width}
                          height={item.album.images[2].height}
                        />
                        <div className="spotify-search-music-list-item-content">
                          <Typography
                            variant="h5"
                            sx={{
                              color: "#000000",
                            }}
                          >
                            {item.name}
                          </Typography>
                          <AddCircleOutlineIcon
                            color="primary"
                            fontSize="large"
                          />
                        </div>
                      </div>
                    </Card>
                  </Box>
                ))
              : musicListLimit.map((_, index) => (
                  <div className="spotify-search-music-list-item" key={index}>
                    <Skeleton animation="wave" width={"100%"} height={"100%"} />
                  </div>
                ))}
          </div>
          <Pagination
            sx={{
              color: "#ffffff",
            }}
            color="primary"
            onChange={musicListPaginationHandler}
            size={"large"}
            count={musicTrackData?.total && musicTrackData?.total / 10}
          />
        </div>
      </Container>
    </>
  );
}
