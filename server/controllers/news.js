// controllers/newsController.js
const News = require('../models/newsModel')
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

// Function to validate category ID
const validateCategory = async (categoryId) => {
  return await Category.exists({ _id: categoryId });
};

// Function to validate subcategory ID
const validateSubCategory = async (subcategoryId) => {
  return await SubCategory.exists({ _id: subcategoryId });
};

// Function to check if all required fields are present
const validateRequiredFields = (req) => {
  const {
    title,
    subtitle,
    location,
    category,
    subcategory,
    expire,
    type,
    description,
    language,
    images,
  } = req.body;

  if (!type || !title || !subtitle || !language || !location || !category || !subcategory || !description || !images) {
    return false;
  }
  return true;
};

// Create a new news article
const createNews = async (req, res) => {
  if (!validateRequiredFields(req)) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const {
    title,
    subtitle,
    language,
    location,
    category,
    subcategory,
    expire,
    type,
    description,
    images,
    youtubeurl
  } = req.body;

  // Parse images array from JSON string to JavaScript object
  const imagesArray = JSON.parse(images);

  try {
    // Validate category ID
    const isValidCategory = await validateCategory(category);
    if (!isValidCategory) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    // Validate subcategory ID
    const isValidSubCategory = await validateSubCategory(subcategory);
    if (!isValidSubCategory) {
      return res.status(400).json({ success: false, message: 'Invalid subcategory ID' });
    }

    const newNews = new News({
      title,
      subtitle,
      location,
      category,
      subcategory,
      language,
      type,
      expire: new Date(expire), // Convert expire to Date format
      description,
      images: imagesArray, // Assign parsed images array
      youtubeurl: youtubeurl || null, // Set youtubeurl to null if not provided
    });

    await newNews.save();

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          news: newNews._id,
        },
      },
      { new: true }
    )
    const categoryDetails3 = await SubCategory.findByIdAndUpdate(
      { _id: subcategory },
      {
        $push: {
          news: newNews._id,
        },
      },
      { new: true }
    )

    res.status(201).json({ success: true, message: 'News article created successfully', news: newNews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update news article by ID
const updateNewsById = async (req, res) => {
  const newsId = req.body.id;

  if (!validateRequiredFields(req)) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const {
    title,
    subtitle,
    location,
    category,
    subcategory,
    expire,
    type,
    description,
    images,
    youtubeurl
  } = req.body;

  // Parse images array from JSON string to JavaScript object
  const imagesArray = JSON.parse(images);

  try {
    // Validate category ID
    const isValidCategory = await validateCategory(category);
    if (!isValidCategory) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    // Validate subcategory ID
    const isValidSubCategory = await validateSubCategory(subcategory);
    if (!isValidSubCategory) {
      return res.status(400).json({ success: false, message: 'Invalid subcategory ID' });
    }

    const updatedFields = {
      title,
      subtitle,
      location,
      category,
      subcategory,
      expire: new Date(expire), // Convert expire to Date format
      description,
      type,
      images: imagesArray, // Assign parsed images array
      youtubeurl: youtubeurl || null, // Set youtubeurl to null if not provided
    };

    const updatedNews = await News.findByIdAndUpdate(newsId, updatedFields, { new: true });

    if (!updatedNews) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    res.json({ success: true, message: 'News article updated successfully', news: updatedNews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate('category', 'name') // Populate category with categoryName field
      .populate('subcategory', 'name') // Populate subcategory with subcategoryName field
      .exec();

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to delete a news article by ID
const deleteNewsById = async (req, res) => {
  const newsId = req.body.id;

  try {
    const deletedNews = await News.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    res.json({ success: true, message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNewsById = async (req, res) => {
  const newsId = req.params.newsId;



  try {
    const news = await News.findById(newsId)
      .populate({
        path: 'subcategory',
        populate: { path: 'news' } // Populate subcategory and include all news
      })
      .populate({
        path: 'category',
        populate: { path: 'news' } // Populate subcategories and include all news

      })
      .exec();

    if (!news) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleActive = async (req, res) => {
  const { newsId, activeStatus } = req.body;


  try {
    const news = await News.findByIdAndUpdate(newsId, { active: activeStatus }, { new: true });
    if (!news) {
      return res.status(404).json({ success: false, message: 'news not found' });
    }
    res.json({ success: true, message: 'news activated successfully', news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  createNews,
  updateNewsById,
  toggleActive,
  getAllNews,
  deleteNewsById,
  getNewsById
};
