import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useWindowLocation = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [ location, setLocation ] = useState(`${ pathname }?${ searchParams.toString() }`)

    useEffect(() => {
        setLocation(`${ pathname }?${ searchParams.toString() }`)
    }, [ pathname, searchParams ])

    return location
}