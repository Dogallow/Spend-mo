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



export const getLike = (postId) => async dispatch => {
    const response = await fetch(`/api/like/get/${postId}`)

    if (response.ok) {
        const bool = await response.json()
        return bool
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

            action.likes.likes.forEach(like => {
                if (state[like.post] === undefined) {
                    obj[like.post] = [like.user]
                } else {

                    obj[like.post] = [...state[like.post], like.user]
                }
            })
            console.log('HERE WE GO', state)
            return { ...state, ...obj }
        case DELETE_LIKE:
            let index = state[action.post.post].indexOf(action.post.user)

            let newState = state[action.post.post].splice(index, 1)
            return newState
        default:
            return { ...state }
    }
}

export default likeReducer
