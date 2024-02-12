import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PropsWithChildren } from 'react'

function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p
      style={{
        color: 'red',
      }}
    >
      {children}
    </p>
  )
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('이름을 입력해주세요')
      .min(2, '이름은 2글자 이상 입력해주세요')
      .max(10, '이름은 최대 10글자까지 입력 가능해요'),
  })
  .required()

function ReactHookFormWithYup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((e) => console.log(e))}>
      <div>이름</div>
      <input {...register('name')} />
      {errors.name?.message && (
        <ErrorMessage>{errors.name.message}</ErrorMessage>
      )}

      <div>
        <button type='submit'>제출</button>
      </div>
    </form>
  )
}

export default ReactHookFormWithYup
