import { MovieTvItem } from './movieTvItem';

export interface HomeObj {
    head: {now_playing: MovieTvItem[]},
    movie: object,
    tv: object
}

// interface MovieTvItem {
//     id?: number,
//     name?: string,
//     poster_path?: string
// }