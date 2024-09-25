import { toast } from 'react-toastify'
import SummaryApi from '../common'

const addToCart = async (e, id) => {
    e?.stopPropagation() //To Stop the element from refering to mentioned page in root element
    e?.preventDefault()

    const response = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    })
    const responseData = await response.json()
    if (responseData.success) {
        toast.success(responseData.message)
    }
    if (responseData.error) {
        toast.error(responseData.message)
    }

    return responseData
}


export default addToCart