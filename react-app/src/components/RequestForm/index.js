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
        if (username === '') {
            setErrors(['Must Enter a Username'])
            return
        }
        if (requestAmount < 1 || requestAmount > 10000) {
            setErrors(['Amount must be between $1 and $10,000'])
            return
        }
        const obj = {
            'sender_username': username,
            // 'receiver_id': 2,
            'request_amount': Number(requestAmount).toFixed(2)
        }

        let request = await dispatch(requestPaymentTransaction(obj)) 
        await dispatch(getBalanceThunk())
        console.log(request)
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
        if (username === ''){
            setErrors(['Must Enter a Username'])
            return
        }
       if (requestAmount < 1 || requestAmount > 9999){
        setErrors(['Amount must be between $1 and $10,000'])
        return
       }

        const obj = {
            'receiver_username': username,
            'request_amount': Number(requestAmount).toFixed(2)
        }

        let sendTransaction = await dispatch(initiateTransactionAndSendPaymentThunk(obj))
        console.log('Frontend Send Payment Form', sendTransaction)
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
                    <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Request Amount</label>
                    <input required min={1} max={9999} type="number" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)}/>
                </div>
                
                <button type="submit" onClick = {(e)  => handleRequest(e) }>Request</button>
                <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
            </form>
        </div>
    )
}

export default RequestForm


    // < button type = "submit" onClick = { handleRequest } > Request</button >
    //     <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
