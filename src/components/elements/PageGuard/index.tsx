import { useRouter } from 'next/navigation'
import { PageGuardInterface } from './interface'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '@contexts'

export const PageGuard: React.FC<PageGuardInterface> = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login first')
      router.push('/login')
    }
  }, [isAuthenticated])

  return children
}
