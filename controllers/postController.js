import { postModel, userModel } from "../models/blogPostModel.js"



export const createPost = async ( req, res ) => {

  const { title, content, tags, excerpt, slug} = req.body
  const { id } = req.user
  const coverImage = req.file ? req.file.path : '';

  if (req.file && !req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({
      success: false,
      message: "Only image files are allowed"
    });
  }  


  if(!title || !content || !tags) {
    return res.status(422).json({
      success: false,
      message: "Missing required details"
    })
  }

  try {
  if(!id) {
    return res.status(401).json({
      success: false,
      message: "Not authorised. Please log in again"
    })
  }

  const user = await userModel.findById( id )
  if (!user ||user._id.toString() !== id) {
    return res.status(403).json({ 
      success: false, 
      message: "Not allowed to create post" });
  }

  const tagArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
  
  const generatedSlug = slug || (
    title
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/(^-|-$)+/g, '')    
  );

  const generatedExcerpt = excerpt || content.substring(0, 200) + '...';


  const post = new postModel({ 
    title, 
    content, 
    author: id, 
    tags: tagArray,
    coverImage: coverImage,
    excerpt: generatedExcerpt,
    slug: generatedSlug
   })

  await post.save();

  return res.status(200).json({
    success: true,
    message: "Post created successfully"
  })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create post. Try again later.",
  })
  }
}


export const editPost = async (req, res) => {
  try {
    
    if (!req.body) {
      return res.status(400).json({ message: 'Missing form data' })
    }

    const { title, content, tags, excerpt, slug } = req.body;
    const postId = req.params.id;

    const updateData = {
      title,
      content,
      tags,
      excerpt,
      slug,
    };

    if (req.file?.path) {
      updateData.coverImage = req.file.path;
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      updateData,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};





export const deletePost =  async (req, res) => {
  const post = req.post

  try {

    await post.deleteOne()

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    })
    
  }catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete post. Try again later.",
      error: error.message  
    })
  }
  
}

// controllers/postController.js

export const getPostBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await postModel.findOne({ slug }).populate('author', 'name bio profilePicture');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    return res.status(200).json({
      success: true,
      post
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: error.message
    });
  }
};
