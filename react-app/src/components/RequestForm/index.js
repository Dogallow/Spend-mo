import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, NavLink } from "react-router-dom";
import { initiateTransactionAndSendPaymentThunk, requestPaymentTransaction } from "../../store/transactions";
import { getBalanceThunk } from "../../store/wallet";
import NavBar from "../NavBar";
import './PayRequestForm.css'

function RequestForm () {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const [requestAmount, setRequestAmount] = useState('')
    const [username, setUsername] = useState('')
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState([])

    
    
    const dispatch = useDispatch()

    const handleRequest = async (e) => {
        e.preventDefault()

        setErrors([])
        let validate = []

        if (note.length > 240){
            setErrors(['Note can only be a maximum of 240 characters'])
            return
        }
        
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
            'request_amount': Number(requestAmount).toFixed(2),
            note
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
        
        if (!!validate.length) {
            setErrors([...validate])
            return
        } else {
            history.push('/incomplete')
        }
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

        if (note.length > 240) {
            setErrors(['Note can only be a maximum of 240 characters'])
            return
        }

        const obj = {
            'receiver_username': username,
            'request_amount': Number(requestAmount).toFixed(2),
            'note': note
        }

        let sendTransaction = await dispatch(initiateTransactionAndSendPaymentThunk(obj))
        console.log('Frontend Send Payment Form', sendTransaction)
        if (sendTransaction.errors) {
            validate = [sendTransaction.errors]
        }
        await dispatch(getBalanceThunk())
        // Redirect to posts page, CONDITIONALLY
        if (!!validate.length){
            setErrors([...validate])
            return
        } else {
            history.push('/')
        }
    }
    
    return (
        <>
        <NavBar />
        <div className="pay-request-form-container">
            {user && <h1>Pay & Request</h1>}
            <div className="pay-request-error-container">
                <ul className="errors-container" >
                    {!!errors.length && errors.map(error => {

                        return (
                            
                                <li key={error} className='error-li' >{error}</li>
                            
                        )
                    })}
                </ul>
            </div>
            <form className="pay-request-form">
                <div className="amount-container">
                    <label>$</label>
                    <input  placeholder="0" required min={1} max={9999} type="number" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)}/>
                </div>
                <div className="username-container">
                    <label>To</label>
                    <input required type="text" value={username} placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                        <p style={{ fontSize: '14px' }}>If you need a reminder of the usernames available, visit <NavLink style={{ fontSize: '14px' }} to='/users'>Users</NavLink>.</p>
                </div>

                <div className="textarea-container">
                    
                    <textarea placeholder="Note"  value={note} onChange={(e) => setNote(e.target.value)} rows={'5'}/>
                </div>
                
                <div className="pay-req-button-container">
                
                    <button type="submit" onClick = {(e)  => handleRequest(e) }>Request</button>
                    <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default RequestForm


    // < button type = "submit" onClick = { handleRequest } > Request</button >
    //     <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
