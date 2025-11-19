import { useQuery } from '@tanstack/react-query'
import { healthCheck } from '@/services/api'

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthCheck,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  })
}
