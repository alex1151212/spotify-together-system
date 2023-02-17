import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { searchItems, skipToNext } from "@/hook/spotify";
import Image from "next/image";
import { Box, Card, Container, Grid, Paper, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Cookie from "../api/cookie";
import { IMusicItemType, ISearchtTracksResponseType } from "./type";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [musicList, setMusicList] = useState<IMusicItemType[]>([]);

  useEffect(() => {
    const accessToken = Cookie.getCookie("accessToken");
    if (accessToken) setToken(accessToken);
  }, [router.isReady]);

  useEffect(() => {
    if (token) {
      searchItems(token, searchInput).then(
        (data: ISearchtTracksResponseType) => {
          if (data?.items) {
            setMusicList(data.items);
          }
        }
      );
    }

    //eslint-disable-next-line
  }, [searchInput]);

  return (
    <>
      <Container maxWidth="sm" className="spotify-search">
        <div>
          <input
            type="text"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <div className="spotify-search-music-list">
          {musicList.map((item, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "5px",
              }}
            >
              <Card variant="outlined">
                <div className="spotify-search-music-list-item">
                  <Image
                    key={index}
                    src={item.album.images[2].url}
                    alt=""
                    width={item.album.images[2].width}
                    height={item.album.images[2].height}
                  />
                  <div className="spotify-search-music-list-item-content">
                    <Typography variant="h5">{item.name}</Typography>
                    <AddCircleOutlineIcon />
                  </div>
                </div>
              </Card>
            </Box>
          ))}
        </div>
      </Container>
    </>
  );
}
