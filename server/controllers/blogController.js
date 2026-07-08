import Blog from '../models/Blog.js';
import slugify from 'slugify';

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
  try {
    const { category, tag, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10))
      .select('-content -comments');

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit),
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    blog.viewCount += 1;
    await blog.save();

    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Get related blogs
// @route   GET /api/blogs/:slug/related
// @access  Public
export const getRelatedBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    const relatedBlogs = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      isPublished: true,
    })
      .limit(3)
      .select('title slug excerpt featuredImage createdAt readTime');

    res.status(200).json({ success: true, blogs: relatedBlogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to blog
// @route   POST /api/blogs/:slug/comments
// @access  Public
export const addComment = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    blog.comments.push(req.body);
    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Comment submitted for review',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog (Admin)
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });

    // Calculate read time (approx 200 words per minute)
    if (req.body.content) {
      const wordCount = req.body.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      req.body.readTime = Math.ceil(wordCount / 200);
    }

    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog (Admin)
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.body.content) {
      const wordCount = req.body.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      req.body.readTime = Math.ceil(wordCount / 200);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog (Admin)
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    await blog.deleteOne();
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blogs for admin
// @route   GET /api/blogs/admin/all
// @access  Private/Admin
export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort('-createdAt').select('-content');
    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    next(error);
  }
};
