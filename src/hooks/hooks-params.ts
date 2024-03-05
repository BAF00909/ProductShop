import { useState } from "react"

export const useParams = () => {
    const [params, setParams] = useState<Record<string, any>>();

    return { params, setParams }
}