import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import type {
  PostAccommodations200,
  PostAccommodations403,
  PostAccommodations500,
  PostAccommodationsBody,
} from "@/services/api/custom/model";
import { customInstance } from "@/services/api/mutator/custom-instance";
import type {
  ErrorType,
  BodyType,
} from "@/services/api/mutator/custom-instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

/**
 * @summary 宿泊施設新規作成API
 */
export const postAccommodations = (
  postAccommodationsBody: BodyType<PostAccommodationsBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  // ファイル含め、FormDataに各項目を追加していく
  const formData = new FormData();

  Object.entries(postAccommodationsBody.accommodation).forEach(
    ([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
        return;
      }
      formData.append(key, String(value));
    }
  );

  return customInstance<PostAccommodations200>(
    {
      url: `/api/accommodations`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      signal,
    },
    options
  );
};

export const getPostAccommodationsMutationOptions = <
  TError = ErrorType<PostAccommodations403 | PostAccommodations500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAccommodations>>,
    TError,
    { data: BodyType<PostAccommodationsBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postAccommodations>>,
  TError,
  { data: BodyType<PostAccommodationsBody> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAccommodations>>,
    { data: BodyType<PostAccommodationsBody> }
  > = (props) => {
    const { data } = props ?? {};

    return postAccommodations(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostAccommodationsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postAccommodations>>
>;
export type PostAccommodationsMutationBody = BodyType<PostAccommodationsBody>;
export type PostAccommodationsMutationError = ErrorType<
  PostAccommodations403 | PostAccommodations500
>;

/**
 * @summary 宿泊施設新規作成API
 */
export const usePostAccommodations = <
  TError = ErrorType<PostAccommodations403 | PostAccommodations500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAccommodations>>,
    TError,
    { data: BodyType<PostAccommodationsBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postAccommodations>>,
  TError,
  { data: BodyType<PostAccommodationsBody> },
  TContext
> => {
  const mutationOptions = getPostAccommodationsMutationOptions(options);

  return useMutation(mutationOptions);
};
