/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * tripeasy
 * TripeasyのAPI仕様書
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation
} from '@tanstack/react-query'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'
import type {
  PostRegister200,
  PostRegister409,
  PostRegisterBody
} from '../../model'
import { customInstance } from '../../mutator/custom-instance';
import type { ErrorType, BodyType } from '../../mutator/custom-instance';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary 新規ユーザー登録API
 */
export const postRegister = (
    postRegisterBody: BodyType<PostRegisterBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PostRegister200>(
      {url: `/api/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postRegisterBody, signal
    },
      options);
    }
  


export const getPostRegisterMutationOptions = <TError = ErrorType<PostRegister409>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRegister>>, TError,{data: BodyType<PostRegisterBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postRegister>>, TError,{data: BodyType<PostRegisterBody>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postRegister>>, {data: BodyType<PostRegisterBody>}> = (props) => {
          const {data} = props ?? {};

          return  postRegister(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postRegister>>>
    export type PostRegisterMutationBody = BodyType<PostRegisterBody>
    export type PostRegisterMutationError = ErrorType<PostRegister409>

    /**
 * @summary 新規ユーザー登録API
 */
export const usePostRegister = <TError = ErrorType<PostRegister409>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRegister>>, TError,{data: BodyType<PostRegisterBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof postRegister>>,
        TError,
        {data: BodyType<PostRegisterBody>},
        TContext
      > => {

      const mutationOptions = getPostRegisterMutationOptions(options);

      return useMutation(mutationOptions);
    }
    