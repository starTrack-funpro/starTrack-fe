import axios from 'axios'
import { useState } from 'react'
import { ResponseType } from './interface'

export function useApi() {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const [loading, setLoading] = useState(false)

  const callAxios = async (method: string, url: string, body?: any) => {
    setLoading(true)

    const responseObj: ResponseType = {
      response: undefined,
      error: undefined,
    }

    try {
      responseObj.response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body,
        withCredentials: true,
      })
    } catch (e: any) {
      responseObj.error = e
    }

    setLoading(false)

    return responseObj
  }

  const api = {
    get: async (url: string) => {
      return await callAxios('get', url)
    },
    post: async (url: string, body: any) => {
      return await callAxios('post', url, body)
    },
    patch: async (url: string, body: any) => {
      return await callAxios('patch', url, body)
    },
    delete: async (url: string) => {
      return await callAxios('delete', url)
    },
  }

  return { loading, api }
}
