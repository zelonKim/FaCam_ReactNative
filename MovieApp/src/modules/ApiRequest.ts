import axios from 'axios';
import { Movie } from '../types';

const API_KEY = 'kjtireow485sefsdsgewgew3t';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.rog/3',
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

interface MovieResponse {
  poster_path: string | null;
  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  title: string;
}

interface getDiscoverMoviesResponse {
  page: number;
  results: MovieResponse[];
  total_results: number;
  total_pages: number;
}

interface GetDiscoverMovieParams {
  releaseDateGte?: string;
  releaseDateLte?: string;
  page?: number;
}

export const getDiscoverMovies = async ({
  releaseDateGte,
  releaseDateLte,
  page,
}: GetDiscoverMovieParams) => {
  const response = await instance.get<getDiscoverMoviesResponse>(
    'discover/movie',
    {
      params: {
        ['release_date.gte']: releaseDateGte,
        ['release_date.lte']: releaseDateLte,
        region: 'KR',
        page: page,
      },
    },
  );

  const movies: Movie[] = response.data.results.map<Movie>(r => ({
    id: r.id,
    title: r.title,
    originalTitle: r.original_title,
    releaseDate: r.release_date,
    overview: r.overview,
    posterUrl:
      r.poster_path != null ? `${IMG_BASE_URL}/${r.poster_path}` : null,
  }));

  return {
    page: response.data.page,
    results: movies,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  };
};
