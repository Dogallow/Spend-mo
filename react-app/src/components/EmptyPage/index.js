import {NavLink} from 'react-router-dom'
import emptyPageLogoSanta from '../images/alternate-empty-page-img-santa.jpg'
import emptyPageLogoScrooge from '../images/alternate-empty-page-img-scrooge.jpg'
import errorImage from '../images/404-image.jpg'
import './EmptyPage.css'

function EmptyPage({ page }) {
let logo
    if (page === 'posts'){
        logo = (
            <>
            <div className='empty-page-title'>
                <h2>Be the First to Share</h2>
                <NavLink to={'/form'}>Pay or Request</NavLink>
            </div>
            <div className="empty-page-image-wrapper">
                <NavLink className={"empty-page-link-img"} to={'/form'}>
                    <img src={emptyPageLogoSanta} />
                </NavLink>
            </div>
            </>
            )
    } else if (page === 'request') {
        logo = (
            <>
                <div className='empty-page-title'>
                    <h2>Let's Initiate a transaction</h2>
                    <NavLink to={'/form'}>Pay or Request</NavLink>
                </div>
                <div style={{ width: '100 %'}} className="empty-page-image-wrapper">
                    <NavLink style={{ maxWidth: '100 %' }}  className={"empty-page-link-img"} to={'/form'}>
                        <img style={{ objectFit: 'cover',height: '100%' }} src={emptyPageLogoScrooge} />
                    </NavLink>
                </div>
            </>
        )
    }else {
        logo = (
            <>
                <div className='empty-page-title'>
                    <h2 style={{color: 'black'}}>404 Error: Page Not Found</h2>
                    
                </div>
                <div style={{ width: '100 %' }} className="empty-page-image-wrapper">
                <img style={{ objectFit: 'cover', height: '100%' }} src={errorImage} />
                </div>
                <NavLink style={{height: 'auto'}} className={"empty-page-link-img"} to={'/'}>
                Go Home
                </NavLink>
            </>
        )

    }
    
    return (
        <div className="empty-page-container">
            {logo}
        </div >
    )
}

export default EmptyPage
