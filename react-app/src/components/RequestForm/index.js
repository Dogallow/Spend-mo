import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { requestPaymentTransaction } from "../../store/transactions";
import { getBalanceThunk } from "../../store/wallet";

function RequestForm () {
    const user = useSelector(state => state.session.user)
    
    const [requestAmount, setRequestAmount] = useState('')
    const [username, setUsername] = useState('')

    
    
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const obj = {
            'sender_username': username,
            // 'receiver_id': 2,
            'request_amount': parseInt(requestAmount)
        }

        dispatch(requestPaymentTransaction(obj)).then(() => dispatch(getBalanceThunk()))

        console.log('Sent a request:', obj)
    }
    
    return (
        <div>
            {user && <h1>Hello {user.username}</h1>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Request Amount</label>
                    <input type="number" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)}/>
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default RequestForm
