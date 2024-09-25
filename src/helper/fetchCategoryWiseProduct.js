import SummaryApi from "../common"


const fetchCategoryWiseProduct = async (category) => {
    const responce = await fetch(SummaryApi.categoryWiseProduct.url, {
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })

    const dataResponse = await responce.json()

    return dataResponse
}

export default fetchCategoryWiseProduct