// controllers/categoryController.js
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

// Create a new category
const createCategory = async (req, res) => {
    const { name, description, image } = req.body;
    try {
        const newCategory = new Category({
            name,
            description,
            image,
            subCategories: [],
        });
        await newCategory.save();
        res
            .status(201)
            .json({
                success: true,
                message: "Category created successfully",
                category: newCategory,
            });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all categories with populated subCategories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("subCategories");
        res.json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single category by ID with populated subCategories
const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId).populate(
            "subCategories"
        );
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const toggleActive = async (req, res) => {
  const {categoryId ,activeStatus} = req.body;


  try {
    const category = await Category.findByIdAndUpdate(categoryId, { active: activeStatus }, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category activated successfully', category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




//Sub category

// Create a new subcategory
const createSubCategory = async (req, res) => {
    const { name, description, category } = req.body;
    try {
      const newSubCategory = new SubCategory({ name, description, category });
      await newSubCategory.save();
  
      // Add subcategory reference to the corresponding category
      await Category.findByIdAndUpdate(category, { $push: { subCategories: newSubCategory._id } });
  
      res.status(201).json({ success: true, message: 'SubCategory created successfully', subCategory: newSubCategory });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get all subcategories
  const getAllSubCategories = async (req, res) => {
    try {
      const subCategories = await SubCategory.find();
      res.json({ success: true, subCategories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get subcategories for a specific category
  const getSubCategoriesByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const subCategories = await SubCategory.find({ category: categoryId });
      res.json({ success: true, subCategories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };




module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    toggleActive,

    createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
};
