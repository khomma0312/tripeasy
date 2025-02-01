import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import type {
  AccommodationsErrorResponse,
  PatchAccommodationsId200,
  PatchAccommodationsIdBody,
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
export const patchAccommodations = (
  id: number,
  patchAccommodationsBody: BodyType<PatchAccommodationsIdBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  // ファイル含め、FormDataに各項目を追加していく
  const formData = new FormData();

  Object.entries(patchAccommodationsBody.accommodation).forEach(
    ([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
        return;
      }
      formData.append(key, String(value));
    }
  );

  return customInstance<PatchAccommodationsId200>(
    {
      url: `/api/accommodations/${id}`,
      method: "PATCH",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      signal,
    },
    options
  );
};

export const getPatchAccommodationsMutationOptions = <
  TError = ErrorType<AccommodationsErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchAccommodations>>,
    TError,
    { id: number; data: BodyType<PatchAccommodationsIdBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchAccommodations>>,
  TError,
  { id: number; data: BodyType<PatchAccommodationsIdBody> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchAccommodations>>,
    { id: number; data: BodyType<PatchAccommodationsIdBody> }
  > = (props) => {
    const { id, data } = props ?? {};

    return patchAccommodations(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchAccommodationsMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchAccommodations>>
>;
export type PatchAccommodationsMutationBody =
  BodyType<PatchAccommodationsIdBody>;
export type PatchAccommodationsMutationError =
  ErrorType<AccommodationsErrorResponse>;

/**
 * @summary 宿泊施設新規作成API
 */
export const usePatchAccommodationsId = <
  TError = ErrorType<AccommodationsErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchAccommodations>>,
    TError,
    { id: number; data: BodyType<PatchAccommodationsIdBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchAccommodations>>,
  TError,
  { id: number; data: BodyType<PatchAccommodationsIdBody> },
  TContext
> => {
  const mutationOptions = getPatchAccommodationsMutationOptions(options);

  return useMutation(mutationOptions);
};
