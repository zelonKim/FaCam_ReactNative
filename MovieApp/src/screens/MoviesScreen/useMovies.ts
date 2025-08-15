import { useCallback, useMemo } from 'react';
import { Movie } from '../../types';
import { getDiscoverMovies } from '../../modules/ApiRequest';
import moment from 'moment';
import { useInfiniteQuery } from 'react-query';
import Movie from './Movie';

const useMovies = () => {
  const getUpcomingMovies = useCallback(async ({ pageParam = 1 }) => {

    const result = await getDiscoverMovies({
      releaseDateGte: moment().format('YYYY-MM-DD'),
      releaseDateLte: moment().add(1, 'years').format('YYYY-MM-DD'),
      page: pageParam,
    });
    return result;
  }, []);

  
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['upcoming-movies'],
      queryFn: getUpcomingMovies,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  const movies = useMemo(() => {
    return data?.pages.reduce<Movie[]>((allMovies, page) => {
      return allMovies.concat(page.results);
    }, []);
  }, [data]);

  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return { movies, isLoading, loadMore, canLoadMore: hasNextPage, refresh };
};

export default useMovies;
