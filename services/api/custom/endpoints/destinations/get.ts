import {
  customInstance,
  ErrorType,
} from "@/services/api/mutator/custom-instance";
import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from "@tanstack/react-query";
import {
  GetDestinationsSearchParams,
  GetDestinationsSearch200,
  GetDestinationsSearch400,
} from "../../model";

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

// 基本的なレスポンス型とエラー型を定義
type DestinationsResponse = GetDestinationsSearch200;
type DestinationsError = ErrorType<GetDestinationsSearch400>;

// シンプルな型定義に変更
type DestinationsSearchOptions = {
  query?: Partial<
    UseSuspenseInfiniteQueryOptions<
      DestinationsResponse,
      DestinationsError,
      InfiniteData<DestinationsResponse, unknown>
    >
  >;
  request?: SecondParameter<typeof customInstance>;
};

/**
 * 目的地検索のための無限スクロールクエリフック
 */
export function useGetDestinationsSearchSuspenseInfinite(
  params: GetDestinationsSearchParams,
  options?: DestinationsSearchOptions
) {
  return useSuspenseInfiniteQuery<
    DestinationsResponse,
    DestinationsError,
    InfiniteData<DestinationsResponse, unknown>
  >({
    queryKey: ["/api/destinations/search", params],
    queryFn: async ({ pageParam }) => {
      return getDestinationsSearch(
        { ...params, pageParam: pageParam as string | undefined },
        options?.request
      );
    },
    getNextPageParam: (lastPage: DestinationsResponse) =>
      lastPage.nextPageToken,
    initialPageParam: undefined,
    ...options?.query,
  });
}

/**
 * 目的地検索APIを呼び出す関数
 */
export const getDestinationsSearch = async (
  params: GetDestinationsSearchParams & { pageParam?: string },
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DestinationsResponse>(
    {
      url: `/api/destinations/search`,
      method: "GET",
      params: {
        ...params,
        nextPageToken: params.pageParam,
      },
    },
    options
  );
};
