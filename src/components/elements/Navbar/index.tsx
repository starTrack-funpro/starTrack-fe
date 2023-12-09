import { useAuthContext } from '@contexts'
import { useApi } from '@hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '../Button'

export const Navbar = () => {
  const { isAuthenticated, name, refresh } = useAuthContext()
  const { loading, api } = useApi()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await api.post('/auth/logout', new FormData())

    if (!error) {
      toast.success('Successfully logged out')
      router.push('/')
      refresh()
    } else {
      toast.error('Sorry! Something went wrong')
    }
  }

  return (
    <div className="w-full flex bg-black">
      <div className="w-full flex px-8 py-6 gap-12 items-center">
        <Link href="/">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-folly text-transparent bg-clip-text">
            starTrack
          </h1>
        </Link>

        <div className="w-full flex justify-between">
          <nav className="flex items-center">
            <ul className="flex gap-6">
              <Link href="/series">
                <li className="text-2xl font-semibold">Series</li>
              </Link>
              {isAuthenticated && (
                <Link href="/dashboard">
                  <li className="text-2xl font-semibold">Dashboard</li>
                </Link>
              )}
            </ul>
          </nav>

          {!isAuthenticated && (
            <div className="flex gap-2">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="transparent">Sign Up</Button>
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex gap-4 justify-center items-center">
              <span>Hi, {name}</span>
              <Button disabled={loading} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
