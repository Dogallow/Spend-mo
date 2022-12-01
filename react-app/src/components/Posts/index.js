import {useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUserTransactions, deleteTransactionThunk } from '../../store/transactions'
import { getBalanceThunk } from '../../store/wallet'
import { useHistory, Redirect } from 'react-router-dom'
import './Posts.css'
import SinglePost from './SinglePost'
import NavBar from '../NavBar'

function Posts () {
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector(state => state.transactions.allTransactions.transactions)
    const user = useSelector(state => state.session.user)

    const [showForm, setShowForm] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)
    const [note, setNote] = useState('')

    console.log(showForm, currentPost)

    const editNote = async (e, post) => {
        e.preventDefault()
        
            console.log(post)
        let obj = {
            note,
            post
        }
    }
    
    const noteForm = (
        <form onSubmit={editNote}>
            <textarea value={note} onChange={setNote}/>
            
            <button type='submit'>Submit</button>
        </form>
    )

    
    console.log(posts)
    useEffect(() => {
        dispatch(getBalanceThunk())
        dispatch(getAllUserTransactions())
    },[dispatch])
    if (user === null) return <Redirect to={'/login'}/>
    if (!posts) return <h1>Loading...</h1>
    return (
        <>
        <NavBar />
        <div className='posts-container'>
            
            {posts && !!posts.length && posts.filter((post) => post.is_Pending == false && post.transaction_state == 'approved').map((post,index) => {
                    // ${ post.request_amount }
                return(
                    <div key={index} className='individual-post-container'>
                        <div className='user-avatar-container'>
                            <button className='avatar-button'>DG</button>
                        </div>
                        
                        <div className='post-user-info-container'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div className='individual-transaction-info'>
                            <p><strong>{user.username === post.sender_id ? 'You' : post.sender_id}</strong> paid <strong>{user.username === post.receiver_id ? 'You' : post.receiver_id}</strong></p>
                            <p className='individual-transaction-amount'>- ${post.request_amount}</p>
                        </div>
                        <div className='individual-note-info'>
                            {showForm && currentPost == post.id ? <SinglePost setShowForm={setShowForm} post={post}/> : <p>{post.note}</p>}
                        </div>    
                            {user?.id == post.author && (
                                <div className='individual-post-author-button-container'>
                                    
                                    <button  onClick={(e) => {
                                        setShowForm(!showForm)
                                        setCurrentPost(post.id)
                                    }}>{showForm && currentPost == post.id ? 'Cancel Edit': 'Edit'}</button>
                                    <button style={{marginLeft:'10px'}} onClick={async (e) => {
                                        await dispatch(deleteTransactionThunk({'id':post.id}))
                                    }}>Delete Transaction</button>
                                </div>
                            )}
                            </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Posts
