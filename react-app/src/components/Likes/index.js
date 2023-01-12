import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { changeLike, getLike, unlikePost } from "../../store/like";

function Like({ postId, username }) {
    const dispatch = useDispatch()
    const likes = useSelector(state => state.like)

    let arrOfLikes = Object.values(likes)
    let bool = {'boolean': null}
    // console.log('!!!!!! LIKES', likes)
    useEffect( ()=>{
        // bool = await dispatch(getLike())
    },[likes])

    const handleLike = async (e) => {
        e.preventDefault()
        await dispatch(changeLike(postId))
        
    }

    const handleUnlike = async (e) => {
        e.preventDefault()
        await dispatch(unlikePost(postId))
    }

    
    //    console.log('@@@ THIS IS THE LIKES OF THE CURRENT POST',likes[postId])
    // console.log('@@@ THIS IS THE USING THE INCLUDES METHOD', likes[postId]?.includes(username))

    if (likes[postId] && likes[postId]?.includes(username)) return <button style={{ border: '0', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={handleUnlike} ><i class="fa-solid fa-heart fa-lg" style={{color: 'red'}}></i></button>
    
    
    return(
        <button style={{ border: '0', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={handleLike}><i class="fa-sharp fa-solid fa-heart fa-lg"></i></button>
    )
}

export default Like
