'use client'

import { useAuthContext } from '@contexts'
import { Button, Input } from '@elements'
import { useApi } from '@hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const LoginModule = () => {
  const [inputUsername, setInputUsername] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')
  const { loading, api } = useApi()
  const { refresh } = useAuthContext()
  const router = useRouter()

  const handleLogin = async () => {
    if (!inputUsername || !inputPassword) {
      toast.error('Please fill all fields')
      return
    }

    const formData = new FormData()
    formData.append('username', inputUsername)
    formData.append('password', inputPassword)

    const { error } = await api.post('/auth/login', formData)

    if (!error) {
      toast.success('Successfully logged in')
      router.push('/')
      refresh()
    } else {
      const message = error.response.data.message
      if (message === 'Password incorrect' || message === 'User not found') {
        toast.error('Incorrect username or password')
      } else {
        toast.error('Sorry! Something went wrong')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-40">
      <h1 className="text-4xl font-bold">Login</h1>

      <div className="w-1/4 flex flex-col items-center gap-6">
        <div className="flex justify-between gap-6 w-full">
          <span className="text-xl font-semibold">Username</span>
          <Input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-6 w-full">
          <span className="text-xl font-semibold">Password</span>
          <Input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button onClick={handleLogin} disabled={loading}>
          Login
        </Button>

        <div className="flex gap-2">
          <span className="">Do not have an account yet?</span>
          <Link href="/signup">
            <button className="underline underline-offset-4 text-folly2">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
