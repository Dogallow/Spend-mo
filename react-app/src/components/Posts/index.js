import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUserTransactions } from '../../store/transactions'

function Posts () {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.transactions.allTransactions.transactions)

    
    console.log(posts)
    useEffect(() => {
        dispatch(getAllUserTransactions())
    },[dispatch])
    
    if (!posts) return <h1>Loading...</h1>
    return (
        <div>
            {posts && !!posts.length && posts.filter(post => post.is_Pending == false).map(post => {

                return(
                    <div>
                        <p>{post.sender_id} sent ${post.request_amount} to {post.receiver_id}</p>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
