'use client'

import { useApi } from '@hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const SignUpModule = () => {
  const [inputUsername, setInputUsername] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')
  const [inputName, setInputName] = useState<string>('')
  const { loading, api } = useApi()
  const router = useRouter()

  const handleLogin = async () => {
    if (!inputUsername || !inputPassword || !inputName) {
      toast.error('Please fill all fields')
      return
    }

    const formData = new FormData()
    formData.append('username', inputUsername)
    formData.append('password', inputPassword)
    formData.append('name', inputName)

    const { error } = await api.post('/auth/register', formData)

    if (!error) {
      toast.success('Successfully signed up. Please login')
      router.push('/login')
    } else {
      toast.error('Sorry! Something went wrong')
    }
  }

  return (
    <div className="flex flex-col items-center py-40 gap-8">
      <h1 className="text-4xl font-bold">Sign Up</h1>

      <div className="w-1/4 flex flex-col items-center gap-6">
        <div className="flex justify-between gap-6 w-full">
          <span className="text-xl font-semibold">Username</span>
          <input
            type="text"
            className="rounded-lg bg-platinum text-black px-2 outline-folly"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-6 w-full">
          <span className="text-xl font-semibold">Name</span>
          <input
            type="text"
            className="rounded-lg bg-platinum text-black px-2 outline-folly"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-6 w-full">
          <span className="text-xl font-semibold">Password</span>
          <input
            type="password"
            className="rounded-lg bg-platinum text-black px-2 outline-folly"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          className="bg-folly px-6 py-2 rounded-xl"
          onClick={handleLogin}
          disabled={loading}
        >
          Sign Up
        </button>

        <div className="flex gap-2">
          <span className="">Already have an account?</span>
          <button className="underline underline-offset-4 text-[#ff3f78]">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
