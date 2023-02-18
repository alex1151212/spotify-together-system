export type ISearchResponseType = {
  [key in "album" | "tracks"]: ISearchTracksType;
};
export interface ISearchTracksType {
  href: string;
  items: IMusicItemType[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
export interface IMusicType {
  image: IMusicImgType;
}

export interface IMusicImgType {
  url: string;
  width: string;
  height: string;
}

export interface IMusicItemType {
  album: any;
  artists: any;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: false;
  external_ids: { isrc: string };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: 3;
  type: string;
  uri: string;
}
