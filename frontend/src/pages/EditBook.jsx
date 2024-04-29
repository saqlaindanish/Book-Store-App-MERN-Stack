import { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack"

const EditBook = () => {
    const [title, setTitle] = useState('')
    const [aurthor, setAurthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setLoading(false)
                console.log(response.data);
                setAurthor(response.data.aurthor)
                setTitle(response.data.title)
                setPublishYear(response.data.publishYear)
            })
            .catch((err) => {
                setLoading(false)
                alert("An error occured. Please check the console.")
                console.log(err);
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            aurthor,
            publishYear
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false)
                enqueueSnackbar('Book Edited Successfully', { variant: 'success' })
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                enqueueSnackbar('Error', { variant: 'error' })
                setLoading(false)
            })
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Aurthor</label>
                    <input
                        type="text"
                        value={aurthor}
                        onChange={(e) => setAurthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="text"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <button
                    className="p-2 bg-sky-300 m-8"
                    onClick={handleEditBook}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBook