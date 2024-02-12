import { PropsWithChildren, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ReactHookFormWithZod from './ReactHookFormWithZod'
import ReactHookFormWithYup from './ReactHookFormWithYup'

type Gender = 'male' | 'female' | 'other'

type FormType = {
  name: string
  password: string
  passwordConfirm: string
  gender: Gender
}

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

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>()

  const password = useRef<string>()

  password.current = watch('password')

  function onSubmit(data: FormType) {
    console.log(data)
  }

  return (
    <main>
      <ReactHookFormWithYup />

      <hr />

      <ReactHookFormWithZod />

      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>이름</div>
        <input
          {...register('name', { required: true, minLength: 2, maxLength: 10 })}
        />
        {errors.name && errors.name.type === 'required' && (
          <ErrorMessage>이름을 입력해주세요</ErrorMessage>
        )}

        <div>비밀번호</div>
        <input
          type='password'
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 12,
            pattern: /^[a-zA-Z0-9]*$/,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>
        )}

        <div>비밀번호 확인</div>
        <input
          type='password'
          {...register('passwordConfirm', {
            required: true,
            validate: {
              samePassword: (value) => value === password.current,
            },
          })}
        />
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'samePassword' && (
            <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
          )}

        <div>성별</div>
        <select {...register('gender', { required: true })}>
          <option value=''>성별 선택</option>
          <option value='male'>남성</option>
          <option value='female'>여성</option>
          <option value='other'>미공개</option>
        </select>
        {errors.gender && errors.gender.type === 'required' && (
          <ErrorMessage>성별을 선택해주세요</ErrorMessage>
        )}

        <div>
          <button type='submit'>제출</button>
        </div>
      </form>
    </main>
  )
}

export default App
