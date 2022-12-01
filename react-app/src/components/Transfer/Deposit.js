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
        <div className="depositWithdrawContainer">
            <div className="depositWithdrawLinks">
                <NavLink to={'/transfer/deposit'} active exact ><span>Deposit</span></NavLink>
                <NavLink active exact to={'/transfer/withdraw'} ><span>Withdraw</span></NavLink>
            </div>
                <h2>Deposit Funds</h2>
            <form onSubmit={handleDeposit}>
                <ul className="errors-container">
                    {!!errors.length && errors.map((error, index) => {

                        return (
                            <li className="error-li" key={index}>{error}</li>
                        )
                    })}
                </ul>
                    <div className="depositWithdraw-amount-container">
                    <label>$</label>
                        <input placeholder="Amount" className="depositWithdraw-amount-input" required type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                    <button className="depositWithdrawButton"  type="submit">Deposit</button>
            </form>
        </div>
        </>
    )
}

export default Deposit
