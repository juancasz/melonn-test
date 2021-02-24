const calculatePromises = (workingCase,property,order,nowDateTime,nextBusinessDays) => {

    //GET PROPERTY PARAMS BASED ON WORKING CASE
    const minType = workingCase[property].min.type
    const minDeltaHours = workingCase[property].min.deltaHours
    const minDeltaBusinessDays = workingCase[property].min.deltaBusinessDays
    const minTimeOfDay = workingCase[property].min.timeOfDay
    const maxType = workingCase[property].max.type
    const maxDeltaHours = workingCase[property].max.deltaHours
    const maxDeltaBusinessDays = workingCase[property].max.deltaBusinessDays
    const maxTimeOfDay = workingCase[property].max.timeOfDay

    //CALCULATE PROPERTY MIN
    switch(minType){
        case undefined:
            order[property+"Min"] = null
            break
        case 'DELTA-HOURS':
            order[property+"Min"] = new Date(nowDateTime)
            order[property+"Min"].setHours(nowDateTime.getHours()+minDeltaHours)
            order[property+"Min"] = order[property+"Min"].toUTCString()
            break
        case 'DELTA-BUSINESSDAYS':
            order[property+"Min"] = new Date(nextBusinessDays[minDeltaBusinessDays-1])
            order[property+"Min"].setHours(minTimeOfDay)
            order[property+"Min"] = order[property+"Min"].toUTCString()
            break
        default:
    }

    //CALCULATE PROPERTY MIN
    switch(maxType){
        case undefined:
            order[property+"Max"] = null
            break
        case 'DELTA-HOURS':
            order[property+"Max"] = new Date(nowDateTime)
            order[property+"Max"].setHours(nowDateTime.getHours()+maxDeltaHours)
            order[property+"Max"] = order[property+"Max"].toUTCString()
            break
        case 'DELTA-BUSINESSDAYS':
            order[property+"Max"] = new Date(nextBusinessDays[maxDeltaBusinessDays-1])
            order[property+"Max"].setHours(maxTimeOfDay)
            order[property+"Max"] = order[property+"Max"].toUTCString()
            break
        default:
    }

    return order
}

module.exports = { calculatePromises }