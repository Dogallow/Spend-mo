import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { Redirect, NavLink } from "react-router-dom"
import { approveTransactionThunk, declineTransactionThunk, getAllSenderTransactions, getAllUserTransactions } from "../../store/transactions"
import { getBalanceThunk } from "../../store/wallet"
import NavBar from "../NavBar"
import './UserTransactions.css'

function UserTransactions () {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions.sendTransactions.transactions)
    const wallet = useSelector(state => state.wallet)
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    console.log(wallet)
    console.log(user)
    console.log('USE SELECTOR ', transactions)
    

    let balance = null

    if ( wallet.wallet !== undefined ){
        balance = wallet.wallet
    }

    console.log('$$ BALANCE', balance)
    useEffect(() => {
        dispatch(getAllSenderTransactions())
        dispatch(getBalanceThunk())
    },[dispatch])
    if (!transactions) return <h1>...Loading</h1>
    if (!user) return <Redirect to={'/login'} />

    let validate = []

    const approveTransaction = async (transaction) => {
        console.log(transaction)

        validate = []
        // Need a thunk
        const transactionResult = await dispatch(approveTransactionThunk(transaction.id))
        await dispatch(getBalanceThunk())

        if (transactionResult.errors){
            validate = [transactionResult.errors]
        }

        setErrors([...validate])
    }

    const declineTransaction = (transaction) => {
        setErrors([])
        // Need a thunk
        dispatch(declineTransactionThunk(transaction.id))
    }
    
    return (
        <>
        <NavBar />
        <div className="userTransactions-container">
                <div className="userTransactions-Links">
                    <NavLink to={'/Incomplete'} active exact ><span>Incomplete</span></NavLink>
                    <NavLink active exact to={'/notifications'} ><span>Notifications</span></NavLink>
                </div>
            <ul className="errors-container">
                {!!errors.length && errors.map((error, index) => {
                    return (
                        <li className="error-li" key={index}>
                            {error}
                        </li>
                    )
                })}
            </ul>
            {transactions && !!transactions.length && transactions.filter(transaction => transaction.sender_id == user.username).map((transaction, index) => {
                let button1 = null
                let button2 = null
                let status = 'Open'
                if (transaction.is_Pending == true) {
                    button1 = <button onClick={()=>approveTransaction(transaction)}>Approve</button>
                    button2 = <button style={{marginLeft:'10px'}} onClick={() => declineTransaction(transaction)}>Decline</button>
                } else {
                    status = 'Closed'
                }
                
                return (
                    <>
                    <div className="userTransactions-individual-post-container" key={index}>
                        <div className='user-avatar-container'>
                            <button className='avatar-button'>DG</button>
                        </div>
                        <div className="userTransactions-individual-post-info">
                            <div className="userTransactions-individual-payment-info">
                                    {status === 'Closed' ? <p><strong>{user.username === transaction.sender_id ? 'You' : transaction.sender_id}</strong> sent a payment to <strong>{transaction.receiver_id}</strong></p> :
                                        <p><strong>{transaction.receiver_id}</strong> requested a payment from <strong>You</strong></p>
                                }
                                <p className={transaction.transaction_state === 'approved'?"userTransactions-payment-amount": ""}>${transaction.request_amount}</p>
                            </div>
                            <p>{transaction.note}</p>
                                <p>Transaction Status: <strong>{status}</strong></p>
                                {button1}
                                {button2}
                            
                        </div>
                            
                        </div>
                    </>
                    )
            }
            )}
        </div>
        </>
    )
}

export default UserTransactions
