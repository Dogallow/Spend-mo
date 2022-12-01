import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { editTransactionThunk } from '../../store/transactions'

function SinglePost({post,setShowForm}){
    const dispatch = useDispatch()
    const [note, setNote] = useState(post.note)
    const [errors, setErrors] = useState([])
    console.log(post)
    const editNote =async (e) => {
        e.preventDefault()

        setErrors([])

        if (note.length > 240) {
            setErrors(['Note can only be a maximum of 240 characters'])
            return
        }
        
        let obj = {
            'id': post.id,
            note
        }

        const result = await dispatch(editTransactionThunk(obj))

        if (result.errors){
            return
        } else {
            setShowForm(false)
        }
    }
    
    return (
        <>
        <div className="pay-request-error-container">
            <ul className="errors-container" >
                {!!errors.length && errors.map(error => {

                    return (

                        <li key={error} style={{listStyleType:'none'}} className='error-li' >{error}</li>

                    )
                })}
            </ul>
        </div>
        <form className='single-post-form' onSubmit={editNote}>
            <textarea className='single-post-note-container' onChange={(e) => setNote(e.target.value)} value={note}/>
            <button type='submit'>Submit</button>
        </form>
        </>
    )
}
 
export default SinglePost
