import { useAuthContext } from '@contexts'

export const Navbar = () => {
  const { isAuthenticated, name } = useAuthContext()

  return (
    <div className="w-full flex bg-black">
      <div className="w-full flex px-8 py-6 gap-12 items-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-folly text-transparent bg-clip-text">
          starTrack
        </h1>

        <div className="w-full flex justify-between">
          <nav className="flex items-center">
            <ul className="flex gap-6">
              <li className="text-2xl font-semibold">Series</li>
              <li className="text-2xl font-semibold">Dashboard</li>
            </ul>
          </nav>

          {!isAuthenticated && (
            <div>
              <button className="rounded-xl bg-folly px-4 py-2 font-semibold">
                Login
              </button>
              <button className="rounded-xl px-4 py-2 font-semibold">
                Sign Up
              </button>
            </div>
          )}

          {isAuthenticated && <span>Hi, {name}</span>}
        </div>
      </div>
    </div>
  )
}
