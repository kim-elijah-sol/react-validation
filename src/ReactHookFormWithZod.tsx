import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

const genderSchema = z.union([
  z.literal('male'),
  z.literal('female'),
  z.literal('other'),
])

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: '이름은 2글자 이상 입력해주세요.' })
      .max(10, { message: '이름은 최대 10글자까지 입력 가능해요.' }),
    password: z
      .string()
      .min(6)
      .max(12)
      .regex(/^[a-zA-Z0-9]*$/),
    passwordConfirm: z
      .string()
      .min(6)
      .max(12)
      .regex(/^[a-zA-Z0-9]*$/),
    gender: genderSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

type Schema = z.infer<typeof schema>

function ReactHookFormWithZod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
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

export default ReactHookFormWithZod
