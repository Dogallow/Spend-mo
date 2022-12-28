import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { changeLike, getLike, unlikePost } from "../../store/like";

function Like({ postId, username }) {
    const dispatch = useDispatch()
    const likes = useSelector(state => state.like)

    let arrOfLikes = Object.values(likes)
    let bool = {'boolean': null}
    console.log('!!!!!! LIKES', likes)
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

    
       console.log('@@@ THIS IS THE SELECTOR',likes[postId])
    console.log('@@@ THIS IS THE USING THE INCLUDES METHOD', likes[postId]?.includes(username))

    if (likes[postId] && likes[postId]?.includes(username)) return <button onClick={handleUnlike} >Unlike</button>
    
    
    return(
        <button onClick={handleLike}>Like</button>
    )
}

export default Like
