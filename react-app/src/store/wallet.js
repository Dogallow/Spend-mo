const BALANCE = 'wallet/BALANCE'
const CLEAR_WALLET = 'wallet/CLEAR_WALLET'

export const clearWallet = () => {
    return {
        type: CLEAR_WALLET
    }
}

const balanceActionCreator = (wallet) => {
    return {
        type: BALANCE,
        wallet
    }
}

export const getBalanceThunk = () => async dispatch => {
    const response = await fetch(`/api/wallet/`)

    if (response.ok){
        const wallet = await response.json()
        console.log('response from backend wallet', wallet)
        dispatch(balanceActionCreator(wallet))
        // return wallet
    }
}

export const editBalance = (obj, action) => async dispatch => {
    const response = await fetch(`/api/wallet/${action}`, {
        'method': 'PUT',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify(obj)
    })

    if (response.ok){
        const wallet = await response.json()
        console.log('Response from wallet route backend', wallet)
        dispatch(balanceActionCreator(wallet))
        return wallet
    }
}

const walletReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type){
        case BALANCE:
            newState = {...action.wallet}
            return newState
        case CLEAR_WALLET:
            newState = {}
            return newState
        default:
            return state
    }
}

export default walletReducer
