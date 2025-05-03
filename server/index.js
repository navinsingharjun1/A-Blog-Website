const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5001;

mongoose.connect("mongodb://localhost:27017/blogApp")
.then(() => console.log("mongoose is connected to mongoDB"))
.catch((error) => console.log(error.message))

const blogSchema = new mongoose.Schema({
    title:String,
    content:String
})

const Blog = mongoose.model("Blog", blogSchema);

app.use(cors());
app.use(express.json());

app.get("/blogs", async (req, res) => {
    let blogs = await Blog.find();
    res.json(blogs);
})

app.post("/blogs", async(req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.json(blog);
})

app.put("/blogs/:id", async(req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(blog);
})

app.delete("/blogs/:id", async(req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.send("Blog Deleted.")
})

app.listen(port,() => {
    console.log(`Server is listening on http://localhost:${port }`);
})


