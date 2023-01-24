import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, NavLink } from "react-router-dom";
import { initiateTransactionAndSendPaymentThunk, requestPaymentTransaction } from "../../store/transactions";
import { getBalanceThunk } from "../../store/wallet";
import NavBar from "../NavBar";
import UsersList from "../UsersList";
import './PayRequestForm.css'

function RequestForm () {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const inputRef = useRef(null)
    const [requestAmount, setRequestAmount] = useState('')
    const [username, setUsername] = useState('')
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [hideDropdown, setHideDropdown] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            // console.log('Response Data is UsersList Component', responseData)
            setUsers(responseData.users)
        }
        fetchData();
        
    }, []);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (count === 1){
            
            setHideDropdown(true)
            setCount(0)
        }else {
            
            setHideDropdown(false)
            userSearch()
        }
    }, [username])
    const userSearch = () => {
        const matches = users.filter((user) => user.username.toLowerCase().includes(username.toLowerCase())).map(user => user.username)
        setFilteredUsers(matches)
        
    }

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
        // console.log(request)
        if (request.errors){
            validate = [request.errors]
        }
        // console.log('Frontend RequestForm Component', request)
        // Redirect to Incomplete page , CONDITIONALLY
        // console.log('Sent a request:', obj)
        
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
        // console.log('Frontend Send Payment Form', sendTransaction)
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

    function handleFocus() {
        inputRef.current.blur(); // removing focus
    }
    // console.log('THIS IS THE INPUT REF', inputRef)
    
    return (
        <>
        <NavBar />
        <div className="pay-request-form-container" >
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
                    <input ref={inputRef} required type="text" value={username} placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="auto-dropdown-container">
                
                        {!hideDropdown && <div className="auto-dropdown-background" onClick={(e) => {
                            setHideDropdown(true)
                            setCount(0)
                        }}> </div>}
                        {username.length > 0 && !hideDropdown && (
                            filteredUsers.length > 0 ? filteredUsers.map((user, index) => {
                                 
                                
                                return <li className="dropdown-list-items" key={index} onClick={() => {
                                    setCount(1)
                                    setUsername('')
                                    setUsername(user)
                                }}>{user}</li>
                            }) : <li>No Users Found</li>
                        )}
                    
                </div>

                <div className="textarea-container">
                    
                    <textarea placeholder="Note"  value={note} onChange={(e) => setNote(e.target.value)} rows={'5'}/>
                </div>
                
                <div className="pay-req-button-container">
                
                    <button type="submit" onClick = {(e)  => handleRequest(e) }>Request</button>
                    <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
                </div>
            </form>
                <div className="drop-down-container">
                    <p style={{ fontSize: '14px' }}>If you need a reminder of the usernames available, visit <button className="drop-down-container-button" onClick={() => setShowDropdown(!showDropdown)} style={{ fontSize: '14px' }} to='/users'>Users</button>.</p>
                    {showDropdown && <UsersList setUsername={setUsername} setShowDropdown={setShowDropdown} />}
                </div>
        </div>
        </>
    )
}

export default RequestForm


    // < button type = "submit" onClick = { handleRequest } > Request</button >
    //     <button type="submit" onClick={(e) => handleSendPayment(e)}>Pay</button>
