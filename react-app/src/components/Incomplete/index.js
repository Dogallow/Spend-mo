import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from "react-router-dom"
import { cancelTransactionThunk, getAllRequestedTransactions } from "../../store/transactions"
import NavBar from "../NavBar"

function Incomplete(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const requests = useSelector(state => state.transactions.requestTransactions.transactions)
    
    console.log(requests)

    useEffect(() => {
        dispatch(getAllRequestedTransactions())
    },[dispatch])

    const cancelRequest = (request) => {
        dispatch(cancelTransactionThunk(request.id)).then(() => dispatch(getAllRequestedTransactions()))
    }
    
    if (!user) return <Redirect to={'/login'} />
    if (requests == undefined) return <p>Loading...</p>
    return (
        <>
        <NavBar />
        <div>
            {!!requests.length && requests.map((request, index) => {
                let status = null
                if (request.is_Pending == true) {
                    status = 'open'
                }
                return (
                    <div key={index}>
                        
                        <p>{request.receiver_id} requested ${request.request_amount} from {request.sender_id}</p>
                        <p>{request.note}</p>
                        {status && <p>status: {status}</p>}
                        {request.is_Pending && <button onClick={() => cancelRequest(request)}>Cancel Request</button>}
                    </div>
                    
                    )
            })}
        </div>
        </>
    )
}

export default Incomplete
