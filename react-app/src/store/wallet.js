const BALANCE = 'wallet/BALANCE'

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
        return wallet
    }
}

const walletReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type){
        case BALANCE:
            newState = {...action.wallet}
            return newState
        default:
            return state
    }
}

export default walletReducer
