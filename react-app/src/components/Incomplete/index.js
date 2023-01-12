import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { Redirect, NavLink } from "react-router-dom"
import { cancelTransactionThunk, getAllRequestedTransactions } from "../../store/transactions"
import EmptyPage from "../EmptyPage"
import NavBar from "../NavBar"

function Incomplete(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const requests = useSelector(state => state.transactions.requestTransactions.transactions)
    
    // console.log(requests)

    useEffect(() => {
        dispatch(getAllRequestedTransactions())
    },[dispatch])

    const cancelRequest = (request) => {
        dispatch(cancelTransactionThunk(request.id)).then(() => dispatch(getAllRequestedTransactions()))
    }
    
    if (user === null) return <Redirect to={'/login'} />
    if (requests == undefined) return <p>Loading...</p>
    return (
        <>
        <NavBar />
            <div className="userTransactions-container">
                <div className="userTransactions-Links">
                    <NavLink to={'/Incomplete'} active exact ><span>Incomplete</span></NavLink>
                    <NavLink active exact to={'/notifications'} ><span>Notifications</span></NavLink>
                </div>
            {!!requests.length && requests.map((request, index) => {
                let status = null
                if (request.is_Pending == true) {
                    status = 'Open'
                }
                return (
                    <div key={index} className="userTransactions-individual-post-container">
                        <div className='user-avatar-container'>
                            <button style={{ cursor: 'default' }} className='avatar-button'>{request.receiver_id[0]}</button>
                        </div>
                        <div className="userTransactions-individual-post-info">
                            <div className="userTransactions-individual-payment-info">
                                <p><strong>{user.username === request.receiver_id ? 'You' : request.receiver_id}</strong> requested  from <strong>{request.sender_id}</strong></p>
                                <p>${request.request_amount}</p>
                            </div>
                            <p className="userTransactions-individual-payment-info-note">{request.note}</p>
                            {status && <p className="userTransactions-individual-payment-info-status">Status: {status}</p>}
                            {request.is_Pending && (
                                <div className=" userTransactions-individual-payment-info-status">
                                    <button style={{marginTop: '4px'}} onClick={() => cancelRequest(request)}>Cancel Request</button>
                                </div>
                )}
                        </div>
                    </div>
                    
                    )
            })}
            {requests && requests.length === 0 && <EmptyPage page="request"/>}
        </div>
        </>
    )
}

export default Incomplete
