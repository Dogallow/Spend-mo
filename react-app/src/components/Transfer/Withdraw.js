import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { editBalance, getBalanceThunk } from "../../store/wallet"
import NavBar from "../NavBar"
import './Transfer.css'

function Withdraw () {

    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getBalanceThunk())
    })

    const handleWithdraw = async (e) => {
        e.preventDefault()
        setErrors([])
        const obj = {

            amount
        }

        let validate = []

        if (amount > 5000) {
            setErrors(['Cannot withdraw more than $5000 in a single transaction.'])
            return
        }else if (amount < 1) {
            setErrors(['Minimum withdraw amount is $1'])
            return
        }
        
        const result = await dispatch(editBalance(obj, 'withdraw'))
        if(result.errors){
            validate = [result.errors]
        }
        setErrors([...validate])

        if (validate.length === 0){
            alert('Withdraw Successful')
            // Opportunity to add a modal
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
            Withdraw Funds
            <form onSubmit={handleWithdraw}>
                <ul>
                    {!!errors.length && errors.map((error, index) =>{

                        return (
                            <li key={index}>{error}</li>
                        )
                    })}
                </ul>
                <div>
                    <label>Amount</label>
                    <input type="number" min={1} required value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button type="submit">Withdraw</button>
            </form>
        </div>
        </>
    )
}

export default Withdraw
