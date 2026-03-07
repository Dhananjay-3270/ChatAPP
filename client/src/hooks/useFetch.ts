
import { useQuery } from "@tanstack/react-query"
import type { UseQueryOptions, QueryKey, QueryFunction } from "@tanstack/react-query"

export const useFetch = <TData = unknown, TError = unknown>(
    key: QueryKey,
    fn: QueryFunction<TData>,
    queryOptions?: UseQueryOptions<TData, TError>
) => {
    return useQuery<TData, TError>({ queryKey: key, queryFn: fn, ...(queryOptions ?? {}) })
}
