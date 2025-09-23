import { useState, useEffect } from 'react'
import { supabase, ServiceWithPrices } from '../lib/supabase'

export const useServices = () => {
  const [services, setServices] = useState<ServiceWithPrices[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('m_services')
          .select(`
            *,
            m_service_prices (*)
          `)
          .order('id')

        if (error) {
          throw error
        }

        console.log('Services fetched successfully:', data)
        setServices(data as ServiceWithPrices[])
      } catch (err) {
        console.error('Error fetching services:', err)
        setError(err instanceof Error ? err.message : 'サービスの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('m_services')
        .select(`
          *,
          m_service_prices (*)
        `)
        .order('id')

      if (error) {
        throw error
      }

      setServices(data as ServiceWithPrices[])
    } catch (err) {
      console.error('Error fetching services:', err)
      setError(err instanceof Error ? err.message : 'サービスの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return { services, loading, error, refetch }
}