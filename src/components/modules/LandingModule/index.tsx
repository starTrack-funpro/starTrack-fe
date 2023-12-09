'use client'

import { Button } from '@elements'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const LandingModule = () => {
  const [imageUrl, setImageUrl] = useState('')

  const fetchImage = async () => {
    try {
      const res = await fetch(
        'https://startrack-funpro.netlify.app/.netlify/functions/image'
      )
      const resJson = await res.json()

      setImageUrl(resJson.imageUrl)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <main className="flex items-center justify-between px-24">
      <div className="w-1/2 overflow-hidden">
        <Image
          src={imageUrl}
          alt=""
          width={600}
          height={600}
          style={{
            transform: 'rotate(-30deg)',
          }}
        ></Image>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Start Tracking Now!</h1>
        <Link href="/series">
          <Button>Find Your Favorite Series</Button>
        </Link>
      </div>
    </main>
  )
}
