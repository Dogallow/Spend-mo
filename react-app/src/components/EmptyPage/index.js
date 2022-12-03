import {NavLink} from 'react-router-dom'
import emptyPageLogoSanta from '../images/alternate-empty-page-img-santa.jpg'
import emptyPageLogoScrooge from '../images/alternate-empty-page-img-scrooge.jpg'
import emptyPageGif from '../images/200w.webp'
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
                    <h2>You currently have no transactions to view</h2>
                    <NavLink style={{textDecoration: 'underline'}} to={'/form'}>Pay or Request</NavLink>
                </div>
                <div style={{ width: '100 %'}} className="empty-page-image-wrapper">
                    <NavLink style={{ maxWidth: '100 %' }}  className={"empty-page-link-img"} to={'/form'}>
                        <img style={{ objectFit: 'cover', height: '100%' }} src={emptyPageGif} />
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
                <NavLink style={{ height: 'auto', fontSize: '40px', color:'#3d95ce', textDecoration:'underline'}} className={"empty-page-link-img"} to={'/'}>
                Go Home
                </NavLink>
                <div style={{ width: '100 %' }} className="empty-page-image-wrapper">
                <img style={{ objectFit: 'cover', height: '100%' }} src={errorImage} />
                </div>
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
