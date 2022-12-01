import { NavLink } from "react-router-dom"
import NavBar from "../NavBar"
import './Instructions.css'

function Instructions () {

    return (
        <>
            <NavBar />
            <div className="instructions-wrapper">
                <div className="instructions-container">
                    <h1>Instructions</h1>
                    <div className="instructions-form-container">
                        <h2>Welcome to Spend-mo</h2>
                        <div className="instructions-form-main">
                            <p>To get Started Right away, navigate to the <NavLink className={'instructions-link'} style={{
                                color: "#3d95ce",
                                lineHeight: "1"}} to={'/'}>Home Page.</NavLink></p>
                            <p>The goal of this page is to get a quick introduction of how the site works and how to navigate it.</p>
                            <p style={{ borderBottom: '1px solid #ccc'}}>The Navigation Bar to the far left will act as your main HUD. <br/>
                                In the Navigation Bar, you will find links to all the pages you will need as a user.
                            </p>
                            <ul className="instructions-ul">
                                <h3>A quick tour of the Navigation Bar from top to bottom</h3>
                                <li className="instructions-li">Just below the logo, is your User Info. Where you can confirm you are logged in.</li>
                                <li className="instructions-li">The blue "Pay or Request" button is where you can send or request a payment.</li>
                                <li className="instructions-li"><NavLink style={{
                                    color: "#3d95ce",
                                    lineHeight: "1"
                                }} className={'instructions-link'} to='/transfer/deposit'>Transfer Money</NavLink> link is where as a user. You will be able to deposit or withdraw funds.</li>
                                <li className="instructions-li"><NavLink style={{
                                    color: "#3d95ce",
                                    lineHeight: "1"
                                }} className={'instructions-link'} to={'/'}>Home</NavLink> link is where all successful transactions are displayed as posts. </li>
                                <li className="instructions-li">
                                    If you are not sure who you want to send money to or can't remember the username of the person. You can navigate to the <NavLink className={'instructions-link'} style={{
                                        color: "#3d95ce",
                                        lineHeight: "1"
                                    }} to={'/users'}>Users</NavLink> link.
                                </li>
                                <li className="instructions-li">
                                    The <NavLink style={{
                                        color: "#3d95ce",
                                        lineHeight: "1"
                                    }} className={'instructions-link'} to={'/notifications'}>Notifications</NavLink> link is where you as a user can view all of the transactions that you have approved, declined, or sent.
                                </li>
                                <li className="instructions-li">
                                    The <NavLink style={{
                                        color: "#3d95ce",
                                        lineHeight: "1"
                                    }} className={'instructions-link'} to={'/incomplete'}>Incomplete</NavLink> link is where you as a user can view all of the transactions that you have requested that are still in a pending state(They have not been accepted or declined from the user who you requested the payment from).
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Instructions
