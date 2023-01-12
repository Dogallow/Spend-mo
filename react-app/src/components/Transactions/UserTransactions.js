import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { Redirect, NavLink } from "react-router-dom"
import { approveTransactionThunk, declineTransactionThunk, getAllSenderTransactions, getAllUserTransactions } from "../../store/transactions"
import { getBalanceThunk } from "../../store/wallet"
import EmptyPage from "../EmptyPage"
import NavBar from "../NavBar"
import './UserTransactions.css'

function UserTransactions () {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions.sendTransactions.transactions)
    const wallet = useSelector(state => state.wallet)
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    // console.log(wallet)
    // console.log(user)
    // console.log('USE SELECTOR ', transactions)
    

    let balance = null

    if ( wallet.wallet !== undefined ){
        balance = wallet.wallet
    }

    // console.log('$$ BALANCE', balance)
    useEffect(() => {
        dispatch(getAllSenderTransactions())
        dispatch(getBalanceThunk())
    },[dispatch])
    if (!transactions) return <h1>...Loading</h1>
    if (user === null) return <Redirect to={'/login'} />

    let validate = []

    const approveTransaction = async (transaction) => {
        // console.log(transaction)

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
            {transactions && !!transactions.length && transactions.filter(transaction => transaction.sender_id == user.username || (transaction.receiver_id === user.username && transaction.transaction_state === 'approved')).map((transaction, index) => {
                let button1 = null
                let button2 = null
                let status = 'Open'
                if (transaction.is_Pending == true) {
                    button1 = <button onClick={()=>approveTransaction(transaction)}>Approve</button>
                    button2 = <button style={{marginLeft:'10px'}} onClick={() => declineTransaction(transaction)}>Decline</button>
                } else {
                    status = 'Closed'
                }
                let amount 
                if (transaction.transaction_state === 'approved' && transaction.sender_id === user.username){
                    amount = <p className="userTransactions-payment-amount">-${transaction.request_amount}</p>
                }else if (transaction.transaction_state === 'approved' && transaction.receiver_id === user.username){
                    amount = <p className="userTransactions-payment-amount-positive">+${transaction.request_amount}</p>
                }
                
                
                if (transaction.transaction_state === 'cancelled') return
                
                return (
                    
                    <div className="userTransactions-individual-post-container" key={index}>
                        <div >
                            <button style={{ cursor: 'default', backgroundColor: transaction.author_color }} className='avatar-button'><strong>{transaction.author[0]}</strong></button>
                        </div>
                        <div className="userTransactions-individual-post-info">
                            <div className="userTransactions-individual-payment-info">
                                {status === 'Closed' ? <p><strong>{user.username === transaction.sender_id ? 'You' : transaction.sender_id}</strong> {user.username === transaction.sender_id ? transaction.transaction_state : 'sent'} a payment to <strong>{transaction.receiver_id === user.username ? 'You' : transaction.receiver_id}</strong></p> :
                                        <p><strong>{transaction.receiver_id}</strong> requested a payment from <strong>You</strong></p>
                                }
                                {transaction.is_Pending === true ? <p style={{color:'grey'}} >${transaction.request_amount}</p>  :amount}
                            </div>
                                <p className="userTransactions-individual-payment-info-note" >{transaction.note}</p>
                                <p className="userTransactions-individual-payment-info-status">Transaction Status: <strong>{status}</strong></p>
                                <div className=" userTransactions-individual-payment-info-status">
                                    {button1}
                                    {button2}
                                </div>
                            
                        </div>
                            
                        </div>
                    
                    )
            }
            )}
            {transactions && transactions.filter(transaction => transaction.sender_id == user.username || transaction.receiver_id == user.username).length === 0 && <EmptyPage page="request"/>}
        </div>
        </>
    )
}

export default UserTransactions


// { transaction.transaction_state === 'approved' ? "userTransactions-payment-amount" : "" }> ${ transaction.request_amount }
