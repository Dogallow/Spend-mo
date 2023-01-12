import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserTransactions, deleteTransactionThunk } from '../../store/transactions'
import { getBalanceThunk } from '../../store/wallet'
import { useHistory, Redirect } from 'react-router-dom'
import './Posts.css'
import SinglePost from './SinglePost'
import NavBar from '../NavBar'
import EmptyPage from '../EmptyPage'
import Like from '../Likes'
import { getLikes } from '../../store/like'
import Comments from '../Comments'
import { defaultComments, getAllCommentsThunk } from '../../store/comment'

function Posts() {
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector(state => state.transactions.allTransactions.transactions)
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.allComments)

    const [showForm, setShowForm] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)
    const [note, setNote] = useState('')

    // console.log(showForm, currentPost)
    // console.log('COMMENTS',comments)

    const editNote = async (e, post) => {
        e.preventDefault()

        // console.log(post)
        let obj = {
            note,
            post
        }
    }

    const noteForm = (
        <form onSubmit={editNote}>
            <textarea value={note} onChange={setNote} />

            <button type='submit'>Submit</button>
        </form>
    )


    // console.log(posts)
    useEffect(() => {
        dispatch(getBalanceThunk())
        dispatch(getAllUserTransactions())
        dispatch(getLikes())
        dispatch(getAllCommentsThunk()).then(()=> dispatch(defaultComments()))
        
    }, [dispatch])
    if (user === null) return <Redirect to={'/login'} />
    if (!posts) return <h1>Loading...</h1>
    return (
        <>
            <NavBar />
            <div className='posts-container'>

                {posts && !!posts.length && posts.filter((post) => post.is_Pending == false && post.transaction_state == 'approved').map((post, index) => {
                    // ${ post.request_amount }

                    let amountStyling 
                    let plusMinusDefault
                    if (post.receiver_id === user.username){
                        amountStyling = 'individual-transaction-amount-green'
                        plusMinusDefault = '+'
                    } else if (post.sender_id === user.username) {
                        amountStyling = 'individual-transaction-amount-red'
                        plusMinusDefault = '-'
                    } else{
                        amountStyling = 'individual-transaction-amount-black'
                        plusMinusDefault = ''
                    }

                    let commentLength = comments.filter(comment => comment.post === post.id).length

                    let userComment = comments.filter(comment => comment.post === post.id && user.username === comment.commenter)
                    // console.log(userComment)
                    
                    return (
                        <div key={index} className='individual-post-container'>
                            <div className='user-avatar-container'>
                                <button style={{ cursor: 'default', backgroundColor: post.author_color}} className='avatar-button'>{post.author[0]}</button>
                            </div>

                            <div className='post-user-info-container'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div className='individual-transaction-info'>
                                    <p><strong>{user.username === post.sender_id ? 'You' : post.sender_id}</strong> paid <strong>{user.username === post.receiver_id ? 'You' : post.receiver_id}</strong></p>
                                    <p className={amountStyling}>{plusMinusDefault} ${post.request_amount}</p>
                                </div>
                                <div className='individual-note-info'>
                                    {showForm && currentPost == post.id ? <SinglePost setShowForm={setShowForm} post={post} /> : <p>{post.note}</p>}
                                </div>
                                <div style={{paddingLeft: '19px'}}>
                                
                                    {user.username && <Like username={user.username} postId={post.id}/>}

                                    <button  onClick={() => history.push(`/comments/${post.id}`)} className = {commentLength > 0 && userComment.length > 0 ? 'comment-count': ''} style={{ border: '0', backgroundColor: 'transparent', cursor: 'pointer' }}><i class="fa-solid fa-comment fa-lg"></i></button>
                                    {commentLength}
                                </div>
                                {user?.username == post.author && (
                                    <div className='individual-post-author-button-container'>

                                        <button  onClick={(e) => {
                                            setShowForm(!showForm)
                                            setCurrentPost(post.id)
                                        }}>{showForm && currentPost == post.id ? 'Cancel Edit' : 'Edit'}</button>
                                        <button style={{ marginLeft: '10px' }} onClick={async (e) => {
                                            await dispatch(deleteTransactionThunk({ 'id': post.id }))
                                        }}>Delete Transaction</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
                {posts && posts.filter(post => post.transaction_state === 'approved').length === 0 && <EmptyPage page="posts"/>}
            </div>

        </>
    )
}

export default Posts
