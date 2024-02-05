import { useRef } from 'react'
import { useForm } from 'react-hook-form'

type Gender = 'male' | 'female' | 'other'

type FormType = {
  name: string
  password: string
  passwordConfirm: string
  gender: Gender
}

function App() {
  const { register, handleSubmit, watch } = useForm<FormType>()

  const password = useRef<string>()

  password.current = watch('password')

  function onSubmit(data: FormType) {
    console.log(data)
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>이름</div>
        <input
          {...register('name', { required: true, minLength: 2, maxLength: 10 })}
        />

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

        <div>비밀번호 확인</div>
        <input
          type='password'
          {...register('passwordConfirm', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />

        <div>성별</div>
        <select {...register('gender', { required: true })}>
          <option value=''>성별 선택</option>
          <option value='male'>남성</option>
          <option value='female'>여성</option>
          <option value='other'>미공개</option>
        </select>

        <div>
          <button type='submit'>제출</button>
        </div>
      </form>
    </main>
  )
}

export default App
