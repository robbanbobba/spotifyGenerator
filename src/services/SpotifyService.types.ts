export interface SingleSong {
    id: string,
    name: string,
    artist: string
}

export interface SongData {
    items: OriginalSingleSong[]
}

export interface PlayList {
    seeds: {}[]
    tracks: OriginalSingleSong[]
}

export interface OriginalSingleSong {
    name: string,
    popularity: number,
    external_urls: { spotify: string },
    artists: OriginalArtists[],
    type: string,
    id: string,
    is_local: boolean
    uri: string;
}

export interface OriginalArtists {
    external_urls: { spotify: string },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}

export interface PlayList {
    seeds: {}[];
    tracks: OriginalSingleSong[];
}