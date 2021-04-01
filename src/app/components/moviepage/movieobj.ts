import { MovieTvItem } from 'src/app/components/homepage/movieTvItem';

export interface MovieObj {
    detail: object,
    video: object,
    credits: object,
    reviews: object,
    similar: MovieTvItem[],
    recommended: MovieTvItem[]

}