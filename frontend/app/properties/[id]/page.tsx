'use client'

import { useParams } from 'next/navigation'
import { usePropertyContext } from '@/app/contexts/PropertyContext'
import PropertyDetails from './PropertyDetails'

export default function PropertyDetailsPage() {
    const { id } = useParams()
    const { properties } = usePropertyContext()

    const property = properties.find(p => p.id === parseInt(id as string))

    if (!property) {
        return <div>Property not found</div>
    }

    return <PropertyDetails property={property} />
}