import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { initiateTransactionAndSendPaymentThunk, requestPaymentTransaction } from "../../store/transactions";
import { getBalanceThunk } from "../../store/wallet";

function RequestForm () {
    const user = useSelector(state => state.session.user)
    
    const [requestAmount, setRequestAmount] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState([])

    
    
    const dispatch = useDispatch()

    const handleRequest = async (e) => {
        e.preventDefault()

        setErrors([])
        let validate = []

        const obj = {
            'sender_username': username,
            // 'receiver_id': 2,
            'request_amount': parseInt(requestAmount)
        }

        let request = await dispatch(requestPaymentTransaction(obj)) 
        await dispatch(getBalanceThunk())
        if (request.errors){
            validate = [request.errors]
        }
        console.log('Frontend RequestForm Component', request)
        // Redirect to Incomplete page , CONDITIONALLY
        console.log('Sent a request:', obj)
        setErrors([...validate])
    }

    const handleSendPayment = async (e) => {
        e.preventDefault()

        setErrors([])
        let validate = []

        const obj = {
            'receiver_username': username,
            'request_amount': parseInt(requestAmount)
        }

        let sendTransaction = await dispatch(initiateTransactionAndSendPaymentThunk(obj))

        if (sendTransaction.errors) {
            validate = [sendTransaction.errors]
        }
        await dispatch(getBalanceThunk())
        // Redirect to posts page, CONDITIONALLY
        setErrors([...validate])
    }
    
    return (
        <div>
            {user && <h1>Hello {user.username}</h1>}
            <ul>
                {!!errors.length && errors.map(error => {

                    return (
                        <div key={error}>
                            <li>{error}</li>
                        </div>
                    )
                })}
            </ul>
            <form >
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Request Amount</label>
                    <input required min={1} max={9999} type="number" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)}/>
                </div>
                
                <button type="submit" onClick={(e) => handleRequest(e)}>Request</button>
                <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
            </form>
        </div>
    )
}

export default RequestForm
