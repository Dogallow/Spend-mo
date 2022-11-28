import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUserTransactions } from '../../store/transactions'
import './Posts.css'

function Posts () {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.transactions.allTransactions.transactions)

    
    console.log(posts)
    useEffect(() => {
        dispatch(getAllUserTransactions())
    },[dispatch])
    
    if (!posts) return <h1>Loading...</h1>
    return (
        <div className='posts-container'>
            
            {posts && !!posts.length && posts.filter((post) => post.is_Pending == false && post.transaction_state == 'approved').map((post,index) => {

                return(
                    <div key={index} className='individual-post-container'>
                        <div className='user-avatar-container'>
                            <button className='avatar-button'>DG</button>
                        </div>
                        
                        <div className='post-user-info-container'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                            <p><strong>{post.sender_id}</strong> paid ${post.request_amount} to <strong>{post.receiver_id}</strong></p>   
                        
                    </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
