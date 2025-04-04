/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * tripeasy
 * TripeasyのAPI仕様書
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import type {
  DeleteAccommodationsId200,
  DeleteAccommodationsId403,
  DeleteAccommodationsId500,
  GetAccommodations200,
  GetAccommodations403,
  GetAccommodationsId200,
  GetAccommodationsId403,
  GetAccommodationsId404,
  GetAccommodationsParams,
  GetAccommodationsSearch200,
  GetAccommodationsSearch400,
  GetAccommodationsSearchParams
} from '../../model'
import { customInstance } from '../../mutator/custom-instance';
import type { ErrorType } from '../../mutator/custom-instance';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary ログイン中のユーザーに紐づく全ての予約した宿泊施設の取得(ページネーションもあり)
 */
export const getAccommodations = (
    params: GetAccommodationsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GetAccommodations200>(
      {url: `/api/accommodations`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getGetAccommodationsQueryKey = (params: GetAccommodationsParams,) => {
    return [`/api/accommodations`, ...(params ? [params]: [])] as const;
    }

    
export const getGetAccommodationsQueryOptions = <TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(params: GetAccommodationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAccommodationsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAccommodations>>> = ({ signal }) => getAccommodations(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAccommodationsQueryResult = NonNullable<Awaited<ReturnType<typeof getAccommodations>>>
export type GetAccommodationsQueryError = ErrorType<GetAccommodations403>


export function useGetAccommodations<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAccommodations>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodations<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAccommodations>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodations<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary ログイン中のユーザーに紐づく全ての予約した宿泊施設の取得(ページネーションもあり)
 */

export function useGetAccommodations<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAccommodationsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetAccommodationsSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(params: GetAccommodationsParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAccommodationsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAccommodations>>> = ({ signal }) => getAccommodations(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAccommodationsSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getAccommodations>>>
export type GetAccommodationsSuspenseQueryError = ErrorType<GetAccommodations403>


export function useGetAccommodationsSuspense<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsSuspense<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsSuspense<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary ログイン中のユーザーに紐づく全ての予約した宿泊施設の取得(ページネーションもあり)
 */

export function useGetAccommodationsSuspense<TData = Awaited<ReturnType<typeof getAccommodations>>, TError = ErrorType<GetAccommodations403>>(
 params: GetAccommodationsParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodations>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAccommodationsSuspenseQueryOptions(params,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 単一の宿泊施設の取得
 */
export const getAccommodationsId = (
    id: number,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GetAccommodationsId200>(
      {url: `/api/accommodations/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getGetAccommodationsIdQueryKey = (id: number,) => {
    return [`/api/accommodations/${id}`] as const;
    }

    
export const getGetAccommodationsIdQueryOptions = <TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAccommodationsIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAccommodationsId>>> = ({ signal }) => getAccommodationsId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAccommodationsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getAccommodationsId>>>
export type GetAccommodationsIdQueryError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>


export function useGetAccommodationsId<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAccommodationsId>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsId<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAccommodationsId>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsId<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 単一の宿泊施設の取得
 */

export function useGetAccommodationsId<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAccommodationsIdQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetAccommodationsIdSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(id: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAccommodationsIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAccommodationsId>>> = ({ signal }) => getAccommodationsId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAccommodationsIdSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getAccommodationsId>>>
export type GetAccommodationsIdSuspenseQueryError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>


export function useGetAccommodationsIdSuspense<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsIdSuspense<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsIdSuspense<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 単一の宿泊施設の取得
 */

export function useGetAccommodationsIdSuspense<TData = Awaited<ReturnType<typeof getAccommodationsId>>, TError = ErrorType<GetAccommodationsId403 | GetAccommodationsId404>>(
 id: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAccommodationsIdSuspenseQueryOptions(id,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 宿泊施設削除API
 */
export const deleteAccommodationsId = (
    id: number,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<DeleteAccommodationsId200>(
      {url: `/api/accommodations/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteAccommodationsIdMutationOptions = <TError = ErrorType<DeleteAccommodationsId403 | DeleteAccommodationsId500>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteAccommodationsId>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteAccommodationsId>>, TError,{id: number}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteAccommodationsId>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteAccommodationsId(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteAccommodationsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAccommodationsId>>>
    
    export type DeleteAccommodationsIdMutationError = ErrorType<DeleteAccommodationsId403 | DeleteAccommodationsId500>

    /**
 * @summary 宿泊施設削除API
 */
export const useDeleteAccommodationsId = <TError = ErrorType<DeleteAccommodationsId403 | DeleteAccommodationsId500>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteAccommodationsId>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteAccommodationsId>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getDeleteAccommodationsIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary 外部APIから検索した宿泊施設の取得
 */
export const getAccommodationsSearch = (
    params: GetAccommodationsSearchParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GetAccommodationsSearch200>(
      {url: `/api/accommodations/search`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getGetAccommodationsSearchQueryKey = (params: GetAccommodationsSearchParams,) => {
    return [`/api/accommodations/search`, ...(params ? [params]: [])] as const;
    }

    
export const getGetAccommodationsSearchQueryOptions = <TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(params: GetAccommodationsSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAccommodationsSearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAccommodationsSearch>>> = ({ signal }) => getAccommodationsSearch(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAccommodationsSearchQueryResult = NonNullable<Awaited<ReturnType<typeof getAccommodationsSearch>>>
export type GetAccommodationsSearchQueryError = ErrorType<GetAccommodationsSearch400>


export function useGetAccommodationsSearch<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAccommodationsSearch>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsSearch<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAccommodationsSearch>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsSearch<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 外部APIから検索した宿泊施設の取得
 */

export function useGetAccommodationsSearch<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAccommodationsSearchQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetAccommodationsSearchSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(params: GetAccommodationsSearchParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAccommodationsSearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAccommodationsSearch>>> = ({ signal }) => getAccommodationsSearch(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAccommodationsSearchSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getAccommodationsSearch>>>
export type GetAccommodationsSearchSuspenseQueryError = ErrorType<GetAccommodationsSearch400>


export function useGetAccommodationsSearchSuspense<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsSearchSuspense<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAccommodationsSearchSuspense<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 外部APIから検索した宿泊施設の取得
 */

export function useGetAccommodationsSearchSuspense<TData = Awaited<ReturnType<typeof getAccommodationsSearch>>, TError = ErrorType<GetAccommodationsSearch400>>(
 params: GetAccommodationsSearchParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAccommodationsSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAccommodationsSearchSuspenseQueryOptions(params,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



