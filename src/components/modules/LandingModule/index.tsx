'use client'

import { Button } from '@elements'

export const LandingModule = () => {
  return (
    <main className="flex min-h-screen items-center justify-between px-24">
      <div className="w-1/2"></div>
      <div className="w-1/2 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Start Tracking Now!</h1>
        <Button>Find Your Favorite Series</Button>
      </div>
    </main>
  )
}
