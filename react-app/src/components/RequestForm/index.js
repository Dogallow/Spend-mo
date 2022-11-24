import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { requestPaymentTransaction } from "../../store/transactions";

function RequestForm () {
    const [requestAmount, setRequestAmount] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const obj = {
            'sender_id': 1,
            'receiver_id': 2,
            'request_amount': parseInt(requestAmount)
        }

        dispatch(requestPaymentTransaction(obj))

        console.log('Sent a request:', obj)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Request Amount</label>
                <input type="number" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)}/>
            </div>
            
            <button type="submit">Submit</button>
        </form>
    )
}

export default RequestForm
