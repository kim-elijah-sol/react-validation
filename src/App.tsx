import { useForm } from 'react-hook-form'

type Gender = 'male' | 'female' | 'other'

type FormType = {
  name: string
  password: string
  gender: Gender
}

function App() {
  const { register, handleSubmit } = useForm<FormType>()

  function onSubmit(data: FormType) {
    console.log(data)
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>이름</div>
        <input {...register('name')} />

        <div>비밀번호</div>
        <input type='password' {...register('password')} />

        <div>성별</div>
        <select {...register('gender')} defaultValue='other'>
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
