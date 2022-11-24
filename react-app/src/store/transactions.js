const REQUEST_SENT = 'transactions/REQUEST'

const requestSent = (request) => {
    return {
        type: REQUEST_SENT,
        request
    }
}

export const requestPaymentTransaction = (obj) => async dispatch => {
    const response = await fetch(`/api/transaction/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    })

    if (response.ok){
        const requestDetails = await response.json()
        console.log('request Details from the backend', requestDetails)
        dispatch(requestSent(requestDetails))
        return requestDetails
    }
}   


const transactionsReducer = (state = {}, action) => {
    switch(action.type){
        case REQUEST_SENT:
            let newState = {...action.request}
            return newState
        default:
            return state
    }
}

export default transactionsReducer
