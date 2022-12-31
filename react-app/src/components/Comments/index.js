import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostCommentsThunk, newCommentThunk } from '../../store/comment'
import { getAllUserTransactions } from '../../store/transactions'
import EmptyPage from '../EmptyPage'
import Like from '../Likes'


import NavBar from '../NavBar'

function Comments () {
    const posts = useSelector(state => state.transactions.allTransactions.transactions)
    const {postId} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.postComments)
    const [comment, setComment] = useState('')

    

    console.log('COMMENTS FROM THE USESELECTOR', comments)
    
    useEffect(()=> {
        dispatch(getAllUserTransactions())
        dispatch(getPostCommentsThunk(postId))
    },[])
    console.log(posts)

    const handleNewComment = async e => {
        e.preventDefault()
        const obj = {
            'post':Number(postId),
            comment,
            
        }
        console.log(obj)
        await dispatch(newCommentThunk(obj))
    }
    
    if (posts){ 
        const post = posts?.find(post => post.id == postId)
        if (!post) return <EmptyPage />
        let amountStyling
        let plusMinusDefault
        if (post.receiver_id === user.username) {
            amountStyling = 'individual-transaction-amount-green'
            plusMinusDefault = '+'
        } else if (post.sender_id === user.username) {
            amountStyling = 'individual-transaction-amount-red'
            plusMinusDefault = '-'
        } else {
            amountStyling = 'individual-transaction-amount-black'
            plusMinusDefault = ''
        }

        



        return ( 
        <>
        <NavBar />
                <div className='posts-container'>
            <div className='individual-post-container'>
                <div className='user-avatar-container'>
                    <button style={{ cursor: 'default' }} className='avatar-button'>{post.author[0]}</button>
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
                        <p>{post.note}</p>
                    </div>
                    {user.username && <Like username={user.username} postId={post.id} />}
                    <button  style={{ border: '0', backgroundColor: 'transparent' }}><i class="fa-solid fa-comment"></i></button>

                    
                </div>
            </div>
            <div>
                {!!comments.length && comments.map((comment, index) => {
                    return (
                        <p>{comment.comment}</p>
                    )
                })}
            </div>
            <div>
                <form onSubmit={handleNewComment}>
                    <input value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            </div>
        </>
        )}
return (
    <div>Loading...</div>
)
}

export default Comments
