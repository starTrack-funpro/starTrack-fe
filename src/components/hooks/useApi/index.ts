import axios from 'axios'
import { useState } from 'react'
import { ResponseType } from './interface'

export function useApi() {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const [loading, setLoading] = useState(false)

  const call = async (axiosWrapper: () => Promise<any>) => {
    setLoading(true)

    const responseObj: ResponseType = {
      response: undefined,
      error: undefined,
    }

    try {
      responseObj.response = await axiosWrapper()
    } catch (e: any) {
      responseObj.error = e
    }

    setLoading(false)

    return responseObj
  }

  const api = {
    get: async (url: string) => {
      return await call(() =>
        axios.get(`${BASE_URL}${url}`, {
          withCredentials: true,
        })
      )
    },
    post: async (url: string, body: any) => {
      return await call(() =>
        axios.post(`${BASE_URL}${url}`, body, {
          withCredentials: true,
        })
      )
    },
  }

  return { loading, api }
}
