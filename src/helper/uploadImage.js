const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "mern_products")

    const dataResponse = await fetch(url, {
        method: "post",
        body: formData
    })

    return dataResponse.json()

}

export default uploadImage