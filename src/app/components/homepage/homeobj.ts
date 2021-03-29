import { MovieItem } from './movieItem';
import { MovieTvItem } from './movieTvItem';

export interface HomeObj {
    head: {now_playing: MovieItem[]},
    movie: [
        {popular: MovieTvItem[]},
        {top_rated: MovieTvItem[]},
        {trending: MovieTvItem[]}
    ],
    tv: {
        popular: MovieTvItem[],
        top_rated: MovieTvItem[],
        trending: MovieTvItem[]
    },
}