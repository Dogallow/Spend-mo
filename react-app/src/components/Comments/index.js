import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteCommentThunk, editCommentThunk, getPostCommentsThunk, newCommentThunk } from '../../store/comment'
import { getAllUserTransactions } from '../../store/transactions'
import EmptyPage from '../EmptyPage'
import Like from '../Likes'
import NavBar from '../NavBar'
import  './Comments.css'

function Comments() {
    const posts = useSelector(state => state.transactions.allTransactions.transactions)
    const { postId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.postComments)
    const [comment, setComment] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)
    const [revisedComment, setRevisedComment] = useState('')



    console.log('COMMENTS FROM THE USESELECTOR', comments)
    console.log('COMMENTS USER', user)

    useEffect(() => {
        dispatch(getAllUserTransactions())
        dispatch(getPostCommentsThunk(postId))
    }, [])
    console.log(posts)

    const handleNewComment = async e => {
        e.preventDefault()
        const obj = {
            'post': Number(postId),
            comment,

        }
        console.log(obj)
        await dispatch(newCommentThunk(obj))
        setComment('')
    }

    const editComment = async (e, commentId) => {
        e.preventDefault()
        let obj = {
            'id': currentPost,
            'comment': revisedComment
        }
        await dispatch(editCommentThunk(obj))
        setShowForm(false)
    }

    const deleteComment = async (e, commentId) => {
        e.preventDefault()
        await dispatch(deleteCommentThunk(commentId))
    }
    
    if (posts) {
        const post = posts?.find(post => post.id == postId)
        if (!post) return <EmptyPage />
        let userComment = comments.filter(comment => comment.post === post.id && user.username === comment.commenter)
        console.log(userComment)
        
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
                                <p>{post.note}</p>
                            </div>
                            <div className='comment-like-icon-container'>
                                {user.username && <Like username={user.username} postId={post.id} />}
                                <button className = { comments.length > 0 && userComment.length > 0 ? 'comment-count' : ''} style={{ border: '0', backgroundColor: 'transparent', marginLeft:'16px' }}><i class="fa-solid fa-comment fa-lg"></i></button>
                                {comments.length}
                            </div>


                        </div>
                    </div>
                    <div className='all-posts-comments-container'>
                        {!!comments.length && comments.map((comment, index) => {

                            let lastComment = (comments.length - 1) === index 
                            
                            return (
                                <>

                                    {showForm && currentPost === comment.id ? (
                                        <form onSubmit={editComment}>
                                            <input value={revisedComment} onChange={(e) => setRevisedComment(e.target.value)} />
                                            <button type='submit'>Submit</button>
                                        </form>
                                    ) : <div className='comment-container'>
                                            <div className='user-avatar-container'>
                                                <button style={{ cursor: 'default' }} className='avatar-button'>{comment.commenter[0]}</button>
                                            </div>
                                            <div className={lastComment ?'individual-comment-section-null' : 'individual-comment-section'}>
                                                <div className='comment-section-text'>
                                                    <p><strong>{comment.commenter}</strong></p>
                                                    <p style={{paddingBottom: '10px'}}>{comment.comment}</p>
                                                </div>
                                                <div className='individual-comment-button-section'>
                                                    {user.username === comment.commenter && <button onClick={(e) => deleteComment(e, comment.id)}>Delete</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    
                                </>
                            )
                        })}
                        <div className='comment-input-container'>
                            <div className='comment-input-avatar-container'>
                                <div className='comment-input-avatar-text' style={{backgroundColor: user.color}}>             {user.username[0]}
                                </div>
                            </div>
                            <form className='comment-form-container' onSubmit={handleNewComment}>
                                <input style={{ margin: '0px' }} className='comment-form-input' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comment...' />
                                
                            </form>
                            <div className='comment-delete-button-container'>
                                {comment.length > 0 && <div onClick={(e) => setComment('')} className='comment-delete-button' ><i  class="fa-solid fa-circle-xmark"></i></div>}
                            </div>
                        </div>
                        </div>
                </div>
            </>
        )
    }
    return (
        <div>Loading...</div>
    )
}

export default Comments

// <button onClick={() => {
// setShowForm(!showForm)
// setCurrentPost(comment.id)
// setRevisedComment(comment.comment)
//                                             }}> Edit</button >
