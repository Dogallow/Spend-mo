const ALL_COMMENTS = 'comments/ALL_COMMENTS'
const POST_COMMENTS = 'comments/POST_COMMENTS'
const NEW_COMMENT = 'comments/NEW_COMMENT'
const CLEAR_POST_COMMENTS = 'comments/CLEAR_POST_COMMENTS'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

export const defaultComments = () => {
    return {
        type: CLEAR_POST_COMMENTS
    }
}

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

const editCommentActionCreator = (payload) => {
    return {
        type: EDIT_COMMENT,
        payload
    }
}

const newCommentActionCreator = (payload) => {
    return {
        type: NEW_COMMENT,
        payload
    }
}

const deleteCommentActionCreator = (payload) => {
    return {
        type: DELETE_COMMENT,
        payload
    }
}

export const getAllCommentsThunk = () => async dispatch => {
    const response = await fetch('/api/comments/')

    if (response.ok){
        const comments = await response.json()
        dispatch(allCommentsActionCreator(comments.comments))
        return
    }
}

export const getPostCommentsThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`)

    if (response.ok){
        const comments = await response.json()
        dispatch(postCommentsActionCreator(comments.comments))
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
        // console.log('COMMMENT RETURNED FROM CREATE COMMENT', comment)
        dispatch(newCommentActionCreator(comment))
        return

    }
}

export const editCommentThunk = (obj) => async dispatch => {
    const response = await fetch(`/api/comments/editComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })

    if (response.ok){
        const comment = await response.json()
        dispatch(editCommentActionCreator(comment))

    }
}

export const deleteCommentThunk = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    

    if (response.ok){
        const deletedComment = await response.json()
        dispatch(deleteCommentActionCreator(deletedComment))
    }
}


const initialState = {
    allComments: [],
    postComments: []
}

const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case ALL_COMMENTS:
            let allComments = {...state}
            allComments.allComments = [...action.payload]
            // console.log('allComments', action.payload)
            return allComments
        case POST_COMMENTS:
            // console.log('POST_COMMENT REDUCER', action.payload)
            let postState = {...state, postComments: [...action.payload]}
            return postState
        case NEW_COMMENT:
            newState = {...state}
            // console.log('NEW_COMMENT REDUCER', action.payload)
            newState.postComments = [...state.postComments, action.payload]
            return newState
        case CLEAR_POST_COMMENTS:
            let clear = {...state}
            clear.postComments= []
            return clear
        case EDIT_COMMENT:
            newState = {...state}
            let changedComments = newState.postComments.map(comment => {
                if (comment.id === action.payload.id) return action.payload
                return comment
            })
            return {...state, postComments: changedComments}
        case DELETE_COMMENT:
            newState = [...state.postComments]
            let index = newState.findIndex((element) => element.id === action.payload.id)
            newState.splice(index, 1)

            return {...state, postComments: newState}
        default:
            return state
    }
}

export default commentReducer
