const ALL_COMMENTS = 'comments/ALL_COMMENTS'
const POST_COMMENTS = 'comments/POST_COMMENTS'
const NEW_COMMENT = 'comments/NEW_COMMENT'

const allCommentsActionCreator = (payload) => {
    return {
        type: ALL_COMMENTS,
        payload
    }
}

const postCommentsActionCreator = (payload) => {
    return {
        type: POST_COMMENTS,
        payload
    }
}

const newCommentActionCreator = (payload) => {
    return {
        type: NEW_COMMENT,
        payload
    }
}

export const getAllCommentsThunk = () => async dispatch => {
    const response = await fetch('/api/comments/')

    if (response.ok){
        const comments = await response.json()
        allCommentsActionCreator(comments)
        return
    }
}

export const getPostCommentsThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`)

    if (response.ok){
        const comments = await response.json()
        postCommentsActionCreator(comments.comments)
        return
    }
}

export const newCommentThunk = (obj) => async dispatch => {
    const response = await fetch(`/api/comments/newComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })

    if (response.ok){
        const comment = await response.json()
        newCommentActionCreator(comment.comment)
        return

    }
}


const initialState = {
    allComments: null,
    postComments: []
}

const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_COMMENTS:
            return state
        case POST_COMMENTS:
            return state
        case NEW_COMMENT:
            let newState = {...state, postComments: [...action.payload]}
            return newState
        default:
            return state
    }
}

export default commentReducer
