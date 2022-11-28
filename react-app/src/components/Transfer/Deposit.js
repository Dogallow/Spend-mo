import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { editBalance, getBalanceThunk } from "../../store/wallet"
import './Transfer.css'

function Deposit() {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')

    useEffect(() => {
        dispatch(getBalanceThunk())
    })

    const handleDeposit = async (e) => {
        e.preventDefault()
        const obj = {
            
            amount
        }
        await dispatch(editBalance(obj, 'deposit'))
    }

    return (
        <div>
            <div>
                <NavLink to={'/transfer/deposit'} active exact ><span>Deposit</span></NavLink>
                <NavLink active exact to={'/transfer/withdraw'} ><span>Transfer</span></NavLink>
            </div>
            Deposit Funds
            <form onSubmit={handleDeposit}>
                <div>
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <button type="submit">Deposit</button>
            </form>
        </div>
    )
}

export default Deposit
