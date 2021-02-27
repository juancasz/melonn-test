const baseUrl = process.env.REACT_APP_API_URL_PROMISE

const create = async newOrder => {
    const order = await fetch(baseUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
    }).then(res => res.json())
    return order
}

const getOrders = async () => {
    const orders = await fetch(baseUrl).then(res => res.json())
    return orders
}

const getOrderDetails = async(id) => {
    const order = await fetch(`${baseUrl}/${id}`).then(res => res.json())
    return order
}

const promiseService = {
    create,
    getOrders,
    getOrderDetails
}

export default promiseService