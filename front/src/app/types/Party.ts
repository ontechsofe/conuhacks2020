export interface Party {
    id: string,
    name: string,
    code: string,
    playlist: [],
    previousSong: string,
    currentlyPlaying: Song,
    state: number
};