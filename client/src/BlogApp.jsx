import { useEffect } from "react";
import { use } from "react";
import { useState } from "react";

function BlogApp() {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState(" ")
    const [content, setContent] = useState(" ")

    useEffect(() => {
        fetchBlogs();
    },[])

    async function fetchBlogs(){
        const response = await axios.get("http://localhost:5000/blogs")
        setBlogs(response.data)
    }

    function handleTitle(event) {
        setTitle = event.target.value;
    }

    function handleContent(event) {
        setContent = event.target.value;
    }

    async function createBlog() {
        const response = await axios.post("http://localhost:5000/blogs", {title, content});
        fetchBlogs();
        setTitle(" ");
        setContent(" ");
    }



    return (
        <div>
            <h1> Simple Blog </h1>
            <input placeholder="Title" value={title} onChange={handleTitle}/>
            <textarea placeholder="content...." value={content} onChange={handleContent} />
            <button  onClick={createBlog}> Create Blog </button>

            {blogs.map((blog) => (
                <div key={blog_id}> 
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    )
}

export default BlogApp;