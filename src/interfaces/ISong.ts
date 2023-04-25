export interface ISong {
  id?: string;
  album?: IAlbum;
  external_urls?: IExternalUrls;
  name?: string;
  preview_url?: string;
  duration_ms?: number;
}

export interface IAlbum {
  album_group?: string;
  album_type?: string;
  artists?: IArtist[];
  available_markets?: string[];
  external_urls?: IExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  release_date?: Date;
  release_date_precision?: string;
  total_tracks?: number;
  type?: string;
  uri?: string;
}

export interface IArtist {
  external_urls?: IExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface IExternalUrls {
  spotify?: string;
}

export interface Image {
  height?: number;
  url?: string;
  width?: number;
}
