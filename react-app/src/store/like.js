const GET_LIKES = 'likes/GET_LIKES'
const DELETE_LIKE = 'likes/DELETE_LIKE'

const changeLikesActionCreator = (likes) => {
    return {
        'type': GET_LIKES,
        likes
    }
}

const unlikePostActionCreator = (post) => {
    return {
        'type': DELETE_LIKE,
        post
    }
}



export const getLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/like/get`)

    if (response.ok) {
        const values = await response.json()
        dispatch(changeLikesActionCreator(values))
    }
}




export const changeLike = (postId) => async dispatch => {
    const response = await fetch('/api/like/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id': postId })
    })

    if (response.ok) {
        const likes = await response.json()
        dispatch(changeLikesActionCreator(likes))
        return likes
    }
}

export const unlikePost = (postId) => async dispatch => {
    const response = await fetch('/api/like/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id': postId })
    })

    if (response.ok) {
        const post = await response.json()
        dispatch(unlikePostActionCreator(post))
    }
}

const likeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIKES:
            let obj = {}
            // console.log('####### THIS IS THE ARRAY RETURNED FROM THE BACKEND', action.likes.likes)
            action.likes.likes.forEach(like => {
                // console.log('&&&& THIS IS THE OBJ', obj)
                // console.log('&&&& THIS IS THE LIKE IN THE LOOP', like)
                if (obj[like.post] === undefined) {
                    obj[like.post] = [like.user]
                } else {

                    obj[like.post] = [...obj[like.post], like.user]
                }
            })
            // console.log('HERE WE GO', obj)
            return {...obj}
        case DELETE_LIKE:
            // console.log('**************POST DATA FROM BACKEND', action.post)
            let index = state[action.post.post].indexOf(action.post.user)

            state[action.post.post].splice(index, 1)
            // console.log('**************STATE AFTER DELETION', state)
            return {...state}
        default:
            return { ...state }
    }
}

export default likeReducer
