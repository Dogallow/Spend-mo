import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { editBalance, getBalanceThunk } from "../../store/wallet"
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
        
        const result = await dispatch(editBalance(obj, 'withdraw'))
        if(result.errors){
            validate = [result.errors]
        }
        setErrors([...validate])
    }
    return (
        <div>
            <div>
                <NavLink to={'/transfer/deposit'} active exact ><span>Deposit</span></NavLink>
                <NavLink active exact to={'/transfer/withdraw'} ><span>Transfer</span></NavLink>
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
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button type="submit">Deposit</button>
            </form>
        </div>
    )
}

export default Withdraw
