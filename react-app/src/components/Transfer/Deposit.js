import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { editBalance, getBalanceThunk } from "../../store/wallet"
import NavBar from "../NavBar"
import './Transfer.css'

function Deposit() {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getBalanceThunk())
    })

    const handleDeposit = async (e) => {
        e.preventDefault()
        setErrors([])
        if (amount > 2000) {
            setErrors(['Cannot deposit more than $2000 in one transaction.'])
            return
        } else if (amount < 1){
            setErrors(['Must deposit at least $1'])
            return
        }
        
        const obj = {
            
            amount
        }
        await dispatch(editBalance(obj, 'deposit'))

        if (errors.length === 0){
            console.log(errors)
            alert('Successfully Deposited Funds')
            setAmount('')
        }


    }

    return (
        <>
        <NavBar />
        <div>
            <div>
                <NavLink to={'/transfer/deposit'} active exact ><span>Deposit</span></NavLink>
                <NavLink active exact to={'/transfer/withdraw'} ><span>Withdraw</span></NavLink>
            </div>
            Deposit Funds
            <form onSubmit={handleDeposit}>
                <ul>
                    {!!errors.length && errors.map((error, index) => {

                        return (
                            <li key={index}>{error}</li>
                        )
                    })}
                </ul>
                <div>
                    <label>Amount</label>
                    <input required type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <button type="submit">Deposit</button>
            </form>
        </div>
        </>
    )
}

export default Deposit
