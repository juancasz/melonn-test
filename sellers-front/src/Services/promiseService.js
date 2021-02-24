const baseUrl = process.env.REACT_APP_API_URL_PROMISE

const create = async newOrder => {
    const order = await fetch(baseUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
    }).then(res => res.json())
    return order
}

const promiseService = {
    create
}

export default promiseService