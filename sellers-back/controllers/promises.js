const fetch = require('node-fetch')
const promisesRouter = require('express').Router()
const calculator = require('../utils/functions')
const baseUrl = process.env.API_BASE_URL
const apiKey = process.env.API_KEY
let database = []

promisesRouter.get('/:id', async(request,response,next) => {
    try{
        const id = request.params.id
        const order = database.find(order => order.id === Number(id))
        if(order){
            return response.status(200).json(order)
        }
        return response.status(404).json({error: 'Orden inexistente'})
    }catch(error){
        next(error)
    }
})

promisesRouter.get('/',async(request,response,next) => {
    try{
        return response.status(200).json(database)
    }catch(error){
        next(error)
    }
})

promisesRouter.post('/',async(request,response,next) => {
    const body = request.body
    let order = {
        id: database.length+1,
        creationDate: body.creationDate,
        store: body.store,
        idShippingMethod : body.idShippingMethod,
        shippingMethod: body.shippingMethod,
        orderNumber: body.orderNumber,
        buyerName: body.buyerName,
        buyerPhoneNumber: body.buyerPhoneNumber,
        buyerEmail: body.buyerEmail,
        address: body.address,
        city: body.city,
        region: body.region,
        country: body.country,
        items: body.items,
        packPromiseMin : null,
        packPromiseMax : null,
        shipPromiseMin : null,
        shipPromiseMax : null,
        deliveryPromiseMin : null,
        deliveryPromiseMax : null,
        readyPickUpPromiseMin : null,
        readyPickUpPromiseMax : null,
        message: null
    }

    //GET DATA FROM SHIPPING METHOD RULES FROM API
    const idShippingMethod = order.idShippingMethod
    const rules = await fetch(baseUrl+`/shipping-methods/${idShippingMethod}`,{
        headers:{
            'X-API-KEY': `${apiKey}`
        }
    }).then(res => res.json())
    
    //GET NOW DATETIME
    const nowDateTime = new Date()

    //GET NON BUSINESS DAYS
    const offDays = await fetch(baseUrl+`/off-days`,{
        headers:{
            'X-API-KEY': `${apiKey}`
        }
    }).then(res => res.json())

    //BUSINESS DAY?
    const isNowBusinessDay = !offDays.includes(nowDateTime.toISOString().split("T")[0])

    //NEXT BUSINESS DAYS
    let nextBusinessDays = []
    let i = 1
    while(nextBusinessDays.length<10){
        const newBusinessDay = new Date(nowDateTime)
        newBusinessDay.setDate(newBusinessDay.getDate()+i)    
        const isBusinessDay = !offDays.includes(newBusinessDay.toISOString().split("T")[0])
        if(isBusinessDay){
            nextBusinessDays = nextBusinessDays.concat(newBusinessDay)
        }
        i++
    }

    const items = order.items
    //VALIDATE BASED ON WEIGHT AVAILABILITY

    //GET ORDER WEIGHT
    const weight = items.reduce((sum,item) => {
        return sum + Number(item.pesoProducto)
    },0)

    //RULES PARAMETERS WEIGHT
    const minWeight = rules.rules.availability.byWeight.min
    const maxWeight = rules.rules.availability.byWeight.max

    //VALIDATE WEIGHT
    if(weight>maxWeight || weight<minWeight){
        try{
            order.message = `No se puede transportar un pedido de ${weight} Kg. Rango permitido (${minWeight}-${maxWeight})Kg`
            return response.status(201).json(order)
        }catch(error){
            next(error)
        }
    }

    //VALIDATE BASED REQUEST TIME AVAILABILITY
    const dayType = rules.rules.availability.byRequestTime.dayType
    const fromTimeOfDay = rules.rules.availability.byRequestTime.fromTimeOfDay
    const toTimeOfDay = rules.rules.availability.byRequestTime.toTimeOfDay

    if(dayType === 'BUSINESS'){
        if(!isNowBusinessDay){
            order.message = `No puedes crear pedidos hoy`
            return response.status(201).json(order) 
        }
    }

    //VALIDATE TIME OF DAY
    if(nowDateTime.getHours()>toTimeOfDay || nowDateTime.getHours()<fromTimeOfDay){
        try{
            order.message = `Fuera de horario de servicio (${fromTimeOfDay}:00-${toTimeOfDay}:59)`
            return response.status(201).json(order)
        }catch(error){
            next(error)
        }
    }

    //CALCULATE PROMISES

    //DETERMINE WHICH CASE APPLIES

    //GET CASES FROM RULES
    const listCases = rules.rules.promisesParameters.cases

    let workingCase
    for(var j = 0; j<=listCases.length; j++){
        //CASE EXISTS?
        const item = listCases[j]
        if(item.priority !== j+1){
            try{
                order.message = `Caso inexistente`
                return response.status(201).json(order)
            }catch(error){
                next(error)
            }
        }

        //GET CASE CONDITIONS
        const dayType = item.condition.byRequestTime.dayType
        const fromTimeOfDay = item.condition.byRequestTime.fromTimeOfDay
        const toTimeOfDay = item.condition.byRequestTime.toTimeOfDay

        if(dayType === 'BUSINESS'){
            //VALIDATE DAY TYPE
            if(!isNowBusinessDay){
                continue
            }
        }

        //VALIDATE TIME OF DAY
        if(nowDateTime.getHours()>toTimeOfDay || nowDateTime.getHours()<fromTimeOfDay){
            continue
        }

        //SET WORKING CASE
        workingCase = item
        break
    }

    try{
        //CALCULATE PACK PROMISE
        order = calculator.calculatePromises(workingCase,"packPromise",order,nowDateTime,nextBusinessDays)

        //CALCULATE SHIP PROMISE
        order = calculator.calculatePromises(workingCase,"shipPromise",order,nowDateTime,nextBusinessDays)

        //CALCULATE DELIVERY PROMISE
        order = calculator.calculatePromises(workingCase,"deliveryPromise",order,nowDateTime,nextBusinessDays)

        //CALCULATE READY PICK UP PROMISE
        order = calculator.calculatePromises(workingCase,"readyPickUpPromise",order,nowDateTime,nextBusinessDays)

        database = database.concat(order)
        return response.status(201).json(order)
    }catch(error){
        next(error)
    }
})

module.exports = promisesRouter
