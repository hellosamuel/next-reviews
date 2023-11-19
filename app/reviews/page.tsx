import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Heading from '@/components/Heading'
import { getReviews } from '@/lib/reviews'

export const metadata: Metadata = {
  title: 'Reviews'
}

export default async function ReviewsPage() {
  const reviews = await getReviews(6)

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt=""
                priority={index === 0}
                width={320}
                height={180}
                className="rounded-t"
              />
              <h2 className="font-semibold font-orbitron py-1 text-center">{review.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
