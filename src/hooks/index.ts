'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for fetching businesses
 */
export function useBusinesses(filters?: {
  query?: string
  category?: string
  features?: string[]
  minSafetyScore?: number
  city?: string
}) {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = new URLSearchParams()
        if (filters?.query) params.append('query', filters.query)
        if (filters?.category) params.append('category', filters.category)
        if (filters?.features) params.append('features', filters.features.join(','))
        if (filters?.minSafetyScore) params.append('minSafetyScore', filters.minSafetyScore.toString())
        if (filters?.city) params.append('city', filters.city)
        
        const response = await fetch(`/api/businesses?${params.toString()}`)
        const data = await response.json()
        
        if (data.success) {
          setBusinesses(data.data)
        } else {
          setError(data.error || 'Failed to fetch businesses')
        }
      } catch (err) {
        setError('An error occurred while fetching businesses')
      } finally {
        setLoading(false)
      }
    }
    
    fetchBusinesses()
  }, [filters?.query, filters?.category, filters?.features?.join(','), filters?.minSafetyScore, filters?.city])
  
  return { businesses, loading, error }
}

/**
 * Custom hook for fetching a single business
 */
export function useBusiness(id: string) {
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!id) return
    
    const fetchBusiness = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/businesses/${id}`)
        const data = await response.json()
        
        if (data.success) {
          setBusiness(data.data)
        } else {
          setError(data.error || 'Failed to fetch business')
        }
      } catch (err) {
        setError('An error occurred while fetching business')
      } finally {
        setLoading(false)
      }
    }
    
    fetchBusiness()
  }, [id])
  
  return { business, loading, error }
}

/**
 * Custom hook for fetching reviews
 */
export function useReviews(businessId?: string, userId?: string) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = new URLSearchParams()
        if (businessId) params.append('businessId', businessId)
        if (userId) params.append('userId', userId)
        
        const response = await fetch(`/api/reviews?${params.toString()}`)
        const data = await response.json()
        
        if (data.success) {
          setReviews(data.data)
          setTotal(data.total)
        } else {
          setError(data.error || 'Failed to fetch reviews')
        }
      } catch (err) {
        setError('An error occurred while fetching reviews')
      } finally {
        setLoading(false)
      }
    }
    
    fetchReviews()
  }, [businessId, userId])
  
  return { reviews, total, loading, error }
}

/**
 * Custom hook for geolocation
 */
export function useGeolocation() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
  }, [])
  
  return { location, loading, error }
}

/**
 * Custom hook for debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

/**
 * Custom hook for local storage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue] as const
}

/**
 * Custom hook for intersection observer (infinite scroll, lazy loading)
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    if (!ref.current) return
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    
    observer.observe(ref.current)
    
    return () => {
      observer.disconnect()
    }
  }, [ref, options])
  
  return isIntersecting
}

/**
 * Custom hook for media query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [matches, query])
  
  return matches
}

/**
 * Custom hook for online/offline status
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  )
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  
  return isOnline
}

/**
 * Custom hook for copy to clipboard
 */
export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  
  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }
    
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
      return true
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopiedText(null)
      return false
    }
  }, [])
  
  return { copiedText, copy }
}

/**
 * Custom hook for window scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }
    
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])
  
  return scrollPosition
}

/**
 * Custom hook for form validation
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => Partial<Record<keyof T, string>>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...values, [name]: value })
      setErrors(newErrors)
    }
  }
  
  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate(values)
    setErrors(newErrors)
  }
  
  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    setIsSubmitting(true)
    const newErrors = validate(values)
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
    
    setIsSubmitting(false)
  }
  
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  }
}
