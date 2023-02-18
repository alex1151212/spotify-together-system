export interface IRedirectParamsType {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  state?: string;
}

export interface ISearchQueryType{
  q: string,
  type: "album" | "album,track" | "track" ;
  includeExternal?: string,
  limit?: number,
  market?: string,
  offset?: number
}