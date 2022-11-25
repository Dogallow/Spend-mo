const REQUEST_SENT = 'transactions/REQUEST'
const USER_TRANSACTIONS = 'transactions/USER_TRANSACTIONS'
const APPROVE_TRANSACTION = 'transactions/APPROVE_TRANSACTION'

const requestSent = (request) => {
    return {
        type: REQUEST_SENT,
        request
    }
}

const userTransactions = (transactions) => {
    return {
        type: USER_TRANSACTIONS,
        transactions
    }
}

const approveTransactionActionCreator = (transaction) => {
    return {
        type: APPROVE_TRANSACTION,
        transaction
    }
}

export const getAllUserTransactions = () => async dispatch => {
    const response = await fetch(`/api/transaction/`)

    if (response.ok){
        const allTransactions = await response.json()
        
        console.log('All Transactions involving current user where the user is the sender of the payment',allTransactions)

        dispatch(userTransactions(allTransactions))
        
        return allTransactions
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

export const approveTransactionThunk = (id) => async dispatch => {
    const response = await fetch(`/api/transaction/approve/${id}`, )

    if (response.ok){
        const success = await response.json()
        console.log('Returned from the backend', success)
        dispatch(approveTransactionActionCreator(success))
        return success
    }
}


const transactionsReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type){
        case REQUEST_SENT:
            newState = {...action.request}
            return newState
        case USER_TRANSACTIONS: 
            newState = {...action.transactions}
            return newState
        case APPROVE_TRANSACTION:
            newState = {...state}
            console.log('Inside of the transactions reducer. What is the state before we alter it?', newState)
            console.log(action.transaction)
            let alteredState = newState.transactions.map(transaction => {
                if (transaction.id == action.transaction.transaction.id){
                    return action.transaction.transaction
                }
                return transaction
            })
            console.log('This is the altered state reflecting the changed status', alteredState)
            // We want to find our transaction and replace it.
            return {'transactions':alteredState}
        default:
            return state
    }
}

export default transactionsReducer
