import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        setLoading(true) // Start loading

        axios.post("http://localhost:3000/create-post", formData)
            .then(() => {
                // 1. Reset the form fields
                form.reset() 
                
                // 2. Navigate to the feed
                navigate("/feed")
            })
            .catch((err) => {
                console.error(err)
                alert("Error creating post")
            })
            .finally(() => {
                setLoading(false) // Stop loading regardless of success/fail
            })
    }

    return (
        <section className='create-post-section'>
            <h1>Create post</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    required 
                />
                <input 
                    type="text" 
                    name='caption' 
                    placeholder='Enter caption' 
                    required 
                />
                
                {/* Disable button while loading to prevent double-posts */}
                <button type='submit' disabled={loading}>
                    {loading ? "Uploading..." : "Submit"}
                </button>
            </form>
        </section>
    )
}

export default CreatePost