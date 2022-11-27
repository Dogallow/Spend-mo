import { getBalanceThunk } from "./wallet"

const REQUEST_SENT = 'transactions/REQUEST'
const USER_TRANSACTIONS = 'transactions/USER_TRANSACTIONS'
const USER_PAYMENTS = 'transactions/PAYMENTS'
const USER_REQUESTS = 'transactions/USER_REQUESTS'
const APPROVE_TRANSACTION = 'transactions/APPROVE_TRANSACTION'
const DECLINE_TRANSACTION = 'transactions/DECLINE_TRANSACTION'
const CANCEL_TRANSACTION = 'transactions/CANCEL_TRANSACTION'

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

const userRequests = (requests) => {
    return {
        type: USER_REQUESTS,
        requests
    }
}

const userSentPayments = (transactions) => {
    return {
        type: USER_PAYMENTS,
        transactions
    }
}

const approveTransactionActionCreator = (transaction) => {
    return {
        type: APPROVE_TRANSACTION,
        transaction
    }
}

const declineTransactionActionCreator = (transaction) => {
    return {
        type: DECLINE_TRANSACTION,
        transaction
    }
}

const cancelTransactionActionCreator = (transaction) => {
    return {
        type: CANCEL_TRANSACTION,
        transaction
    }
}

export const getAllUserTransactions = () => async dispatch => {
    const response = await fetch(`/api/transaction/`)

    if (response.ok){
        const allTransactions = await response.json()
        
        console.log('All Transactions',allTransactions)

        dispatch(userTransactions(allTransactions))
        
        return allTransactions
    }
}
export const getAllSenderTransactions = () => async dispatch => {
    const response = await fetch(`/api/transaction/`)

    if (response.ok){
        const allTransactions = await response.json()
        
        console.log('All Transactions involving current user where the user is the sender of the payment',allTransactions)

        dispatch(userSentPayments(allTransactions))
        
        return allTransactions
    }
}

export const getAllRequestedTransactions = () => async dispatch => {
    const response = await fetch(`/api/transaction/requests`)

    if (response.ok){
        const requests = await response.json()
        console.log('All Transactions involving current user where the user is the requester of the transaction', requests)
        dispatch(userRequests(requests))
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

export const declineTransactionThunk = (id) => async dispatch => {
    const response = await fetch(`/api/transaction/decline/${id}`)

    if (response.ok){
        const success = await response.json()
        console.log('Declined: returned from the backend', success)
        dispatch(declineTransactionActionCreator(success))
        return success
    }
}

export const cancelTransactionThunk = (id) => async dispatch => {
    const response = await fetch(`/api/transaction/cancel/${id}`)

    if (response.ok){
        const success = await response.json()
        console.log('Declined: returned from the backend', success)
        dispatch(cancelTransactionActionCreator(success))
        return success
    }

}

const initialState ={
    allTransactions: {},
    requestTransactions: {},
    sendTransactions: {},
    request: {},
    sent: {}

}

const transactionsReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case REQUEST_SENT:
            newState = {...state}
            newState.request = {...action.request}
            return newState
        case USER_TRANSACTIONS: 
            newState = {...state}
            newState.allTransactions = {...action.transactions}
            return newState
        case USER_REQUESTS:
            newState = {...state}
            newState.requestTransactions = {...action.requests}
            return newState
        case USER_PAYMENTS:
            newState = {...state}
            newState.sendTransactions = {...action.transactions}
            return newState
        case APPROVE_TRANSACTION:
            newState = {...state}
            console.log('Inside of the transactions reducer. What is the state before we alter it?', newState)
            console.log(action.transaction)
            let alteredState = newState.sendTransactions.transactions.map(transaction => {
                if (transaction.id == action.transaction.transaction.id){
                    return action.transaction.transaction
                }
                return transaction
            })
            console.log('This is the altered state reflecting the changed status', alteredState)
            // We want to find our transaction and replace it.
            return {...state, sendTransactions:{'transactions':alteredState}}
        case CANCEL_TRANSACTION:
            newState = {...state}
            console.log('Inside of the transactions reducer. What is the state before we alter it?', newState)
            console.log(action.transaction)
            let cancelledState = newState.requestTransactions.transactions.map(transaction => {
                console.log(transaction)
                if (transaction.id == action.transaction.transaction.id){
                    return action.transaction.transaction
                }
                return transaction
            })
            console.log('This is the cancelled altered state reflecting the changed status', cancelledState)
            // We want to find our transaction and replace it.
            return {...state, requestTransactions: {...cancelledState}}
        case DECLINE_TRANSACTION:
            newState = {...state}
            console.log('Inside of the transactions reducer. What is the state before we alter it?', newState)
            console.log(action.transaction)
            let declinedState = newState.sendTransactions.transactions.map(transaction => {
                console.log(transaction)
                if (transaction.id == action.transaction.transaction.id){
                    return action.transaction.transaction
                }
                return transaction
            })
            console.log('This is the declined altered state reflecting the changed status', declinedState)
            // We want to find our transaction and replace it.
            return {...state, sendTransactions: {'transactions':declinedState}}
        default:
            return state
    }
}

export default transactionsReducer
