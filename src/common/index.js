const backendDomain = "http://localhost:8080"


const SummaryApi = {
    signup: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signin: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-detail`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    getProducts: {
        url: `${backendDomain}/api/get-products`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-category-product`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-products`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    countCartItems: {
        url: `${backendDomain}/api/countcartitems`,
        method: "get"
    },
    userCartView: {
        url: `${backendDomain}/api/user-cart-view`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProducts: {
        url: `${backendDomain}/api/filter-products`,
        method: "post"
    },
    payment: {
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    orderList: {
        url: `${backendDomain}/api/order-list`,
        method: "get"
    }
}

export default SummaryApi