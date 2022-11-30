import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { editTransactionThunk } from '../../store/transactions'

function SinglePost({post,setShowForm}){
    const dispatch = useDispatch()
    const [note, setNote] = useState(post.note)
    console.log(post)
    const editNote =async (e) => {
        e.preventDefault()
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
        <form onSubmit={editNote}>
            <textarea onChange={(e) => setNote(e.target.value)} value={note}/>
            <button type='submit'>Submit</button>
        </form>
    )
}
 
export default SinglePost
