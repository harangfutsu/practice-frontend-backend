import { useNavigate, useParams } from "react-router"
import { useEffect, useRef } from "react"
import { createData, updateData} from "../store/redux/courseReducer"
import { useSelector, useDispatch } from "react-redux"

const CourseEntry = ({isUpdate}) => {
    const {id} = useParams()
    const formRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {value : course} = useSelector((state) => state.course)

    useEffect(() => {
        if (isUpdate) {
            const courseItem = course.find(item => item.course_id === id)
            formRef.current.title.value = courseItem.title,
            formRef.current.category.value = courseItem.category,
            formRef.current.description.value = courseItem.description,
            formRef.current.price.value = courseItem.price
            formRef.current.language.value = courseItem.language

        } else {
            if (formRef.current) formRef.current.reset()
        }
    }, [isUpdate, id, course])

    return (
        <div>
            <form 
            ref={formRef}
            onSubmit={(e) => {
                e.preventDefault()
                if (isUpdate) {
                            dispatch(updateData({id, payload : {
                                title : e.target.title.value,
                                category : e.target.category.value,
                                description : e.target.description.value,
                                price : e.target.price.value,
                                language : e.target.language.value
                            }}))
                        } else {
                            dispatch(createData({
                                title : e.target.title.value,
                                category : e.target.category.value,
                                description : e.target.description.value,
                                price : e.target.price.value,
                                language : e.target.language.value
                            }))                     
                        }
                navigate('/home')
            }}
            action="">
                <label htmlFor="">Title</label>
                <br />
                <input name="title" id="title" type="text" />
                <br />
                <label htmlFor="">Category</label>
                <br />
                <select name="category" id="category">
                    <option value="Pemasaran">Pemasaran</option>
                    <option value="Desain">Desain</option>
                    <option value="Bisnis">Bisnis</option>
                    <option value="Digital">Digital</option>
                </select>
                <br />
                <label htmlFor="">Description</label>
                <br />
                <input name="description" id="description" type="text" />
                <br />
                <label htmlFor="">Price</label>
                <br />
                <input name="price" id="price" type="text" />
                <br />
                <label htmlFor="">Language</label>
                <br />
                <input name="language" id="language" type="text" />
                <br />
                <button type="submit">{isUpdate ? "Update" : "Submit"}</button>
                <button onClick={() => navigate('/home')}>Cancel</button>
            </form>
        </div>
    )
}
export default CourseEntry
