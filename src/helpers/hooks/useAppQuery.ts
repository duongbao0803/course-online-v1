import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';

export function useAppQuery<
  TData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError, TData, TQueryKey>,
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}
