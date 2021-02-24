const baseUrl = process.env.REACT_APP_API_BASE_URL
const apiKey = process.env.REACT_APP_API_KEY

const getShippingMethods = async() => {
    const shippingMethods = await fetch(baseUrl+"/shipping-methods",{
        headers:{
            'X-API-KEY': `${apiKey}`
        }
    }).then(res => res.json())
    return shippingMethods
}

const sellerService = {
    getShippingMethods
}

export default sellerService