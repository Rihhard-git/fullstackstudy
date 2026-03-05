import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'


const LoginForm = ({ setToken, refetch }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const [ login ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      refetch()
    },
    onError: (error) => {
      console.log(error.message)
    },
  })


  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    navigate('/books')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm