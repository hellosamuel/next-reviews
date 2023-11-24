'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Combobox } from '@headlessui/react'
import { useDebounce } from 'use-debounce'
import { SearchableReview } from '@/lib/reviews'

export default function SearchBox() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const [reviews, setReviews] = useState<SearchableReview[]>([])

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController()
      ;(async () => {
        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`
        const response = await fetch(url, { signal: controller.signal })
        const reviews = await response.json()
        setReviews(reviews)
      })()

      return () => {
        controller.abort()
      }
    } else {
      setReviews([])
    }
  }, [debouncedQuery])

  const handleOnChange = (review: SearchableReview) => {
    router.push(`/reviews/${review.slug}`)
  }

  return (
    <div className="relative w-48">
      <Combobox onChange={handleOnChange}>
        <Combobox.Input
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map(review => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}
