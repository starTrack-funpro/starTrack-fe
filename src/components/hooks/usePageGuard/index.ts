import { useAuthContext } from '@contexts'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const usePageGuard = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login first')
      router.push('/login')
    }
  }, [isAuthenticated])
}
