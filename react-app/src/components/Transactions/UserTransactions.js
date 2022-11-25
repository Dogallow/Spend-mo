import React, {useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { approveTransactionThunk, getAllUserTransactions } from "../../store/transactions"

function UserTransactions () {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions.transactions)

    console.log('USE SELECTOR ', transactions)
    
    useEffect(() => {
        dispatch(getAllUserTransactions())
    },[dispatch])
    if (!transactions) return <h1>...Loading</h1>

    const approveTransaction = (transaction) => {
        console.log(transaction)
        // Need a thunk
        dispatch(approveTransactionThunk(transaction.id))
    }
    
    return (
        <div>
            <p>Transaction List</p>
            {transactions && !!transactions.length && transactions.map((transaction, index) => {
                let button1 = null
                let button2 = null
                if (transaction.is_Pending == true) {
                    button1 = <button onClick={()=>approveTransaction(transaction)}>Approve</button>
                    button2 = <button>Decline</button>
                }
                
                return <div key={index}>
                    <p>{transaction.sender_id}</p>
                    <p>{transaction.receiver_id}</p>
                    <p>{transaction.request_amount}</p>
                    <p>{transaction.is_Pending}</p>
                    {button1}
                    {button2}
                    </div>
            }
            )}
        </div>
    )
}

export default UserTransactions
