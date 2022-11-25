import React, {useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { approveTransactionThunk, getAllUserTransactions } from "../../store/transactions"
import { getBalanceThunk } from "../../store/wallet"

function UserTransactions () {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions.transactions)
    const wallet = useSelector(state => state.wallet)
    console.log(wallet)
    console.log('USE SELECTOR ', transactions)

    let balance = null
    if ( wallet.wallet !== undefined ){
        balance = wallet.wallet
    }
    console.log('$$ BALANCE', balance)
    useEffect(() => {
        dispatch(getAllUserTransactions())
        dispatch(getBalanceThunk())
    },[dispatch])
    if (!transactions) return <h1>...Loading</h1>

    const approveTransaction = (transaction) => {
        console.log(transaction)
        // Need a thunk
        dispatch(approveTransactionThunk(transaction.id)).then(() => dispatch(getBalanceThunk()))
    }
    
    return (
        <div>
            <p>Transaction List</p>
            {balance && <h1>Your balance is: ${balance.balance}</h1>}
            {transactions && !!transactions.length && transactions.map((transaction, index) => {
                let button1 = null
                let button2 = null
                let status = 'open'
                if (transaction.is_Pending == true) {
                    button1 = <button onClick={()=>approveTransaction(transaction)}>Approve</button>
                    button2 = <button>Decline</button>
                } else {
                    status = 'closed'
                }
                
                return <div key={index}>
                    <p>{transaction.sender_id} sent ${transaction.request_amount} to {transaction.receiver_id}</p> 
                    <p>Transaction Status: {status}</p>
                    
                    {button1}
                    {button2}
                    --------------------------
                    </div>
            }
            )}
        </div>
    )
}

export default UserTransactions
