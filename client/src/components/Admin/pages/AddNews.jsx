import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchCategory,
  imageUpload,
  fetchSubCategory,
  createNews,
  getSingleNews
} from "../../../services/operations/admin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function AddNews() {
  //States
  const[product ,setProduct] = useState("")
  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");
  const { token } = useSelector((state) => state.auth);
  const{id} = useParams()


  // Network Call
  // Category Fetch
  useEffect(() => {
    const fetchCategoryMain = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response?.categories);
      } catch (error) {
        // console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategoryMain = async () => {
      try {
        const response = await fetchSubCategory();

        setSubCategories(response);
      } catch (error) {
        //   console.error("Error fetching categories:", error);
      }
    };


    const fetchNews = async (id) => {
      try {
        const response = await getSingleNews(id);
        console.log(response.title)
        setProduct(response)
        setImages(response?.images)
        setEditorHtml(response?.description)
        // setSubCategories(response);
      } catch (error) {
        //   console.error("Error fetching categories:", error);
      }
    };

    if(id){
      fetchNews(id)
    }
    fetchSubCategoryMain();
    fetchCategoryMain();
  }, []);

  // Functions
  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles);
    console.log(response);

    const uploadedImages = response?.map((image) => ({
      public_id: image.asset_id, // Assuming asset_id contains the public_id
      url: image.url, // Assuming url contains the image URL
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const removeImage = (publicId) => {
    // Filter out the image with the specified publicId
    const updatedImages = images.filter(
      (image) => image.public_id !== publicId
    );

    // Update the state with the new array of images
    setImages(updatedImages);
  };

  // Formik Form Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    subtitle: Yup.string().required("Sub Title is required"),
    location: Yup.string().required("location is required"),
    language: Yup.string().required("language is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("subcategory is required"),
  });

  // Formik Form Initial Values
  const initialValues = {
    title: product?.title || "",
    subtitle: "",
    description: "",
    location: "",
    category: "",
    subcategory: "",
    expire: "",
    images: [],
    youtubeurl: "",
  };

  // Formik Form Submission
  const onSubmit = async (values) => {
    console.log(values);
    console.log(editorHtml);

    const formData = new FormData();
    console.log(images);
    // Append other form fields
    formData.append("title", values.title);
    formData.append("description", editorHtml);
    formData.append("subtitle", values.subtitle);
    formData.append("category", values.category);
    formData.append("language", values.language);
    formData.append("subcategory", values.subcategory);
    formData.append("location", values.location);
    formData.append("expire", values.expire);
    formData.append("youtubeurl", values.youtubeurl);
    formData.append("images", JSON.stringify(images));

    await createNews(formData, token);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-xl font-bold mb-4">{id ? "Edit News": "Add News"}</h3>

      <form onSubmit={formik.handleSubmit} initialValues={initialValues} className="space-y-4" int>
        {/* Line 1 */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Your Product Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="form-input"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subtitle"
              className="block font-medium text-gray-700"
            >
              Sub Title
            </label>
            <input
              id="subtitle"
              name="subtitle"
              type="text"
              placeholder="Enter Your Product Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subtitle}
              className="form-input"
            />
            {formik.touched.subtitle && formik.errors.subtitle && (
              <div className="text-red-500">{formik.errors.subtitle}</div>
            )}
          </div>
        </div>

        {/* Line 2 */}
        <div className="grid lg:grid-cols-1 grid-cols-1 ">
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["clean"],
                ],
              }}
              className="quill-editor"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="block font-medium text-gray-700"
            >
              Langauge
            </label>
            <select
              id="language"
              name="language"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.language}
              className="form-input"
            >
              <option value="Hindi" defaultValue="Hindi">
                Hindi
              </option>

              <option value="English">English</option>
            </select>
            {formik.touched.language && formik.errors.language && (
              <div className="text-red-500">{formik.errors.language}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="form-input"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
          </div>
        </div>

        {/* Line 3 */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label
              htmlFor="subcategory"
              className="block font-medium text-gray-700"
            >
              Sub Category
            </label>
            <select
              id="subcategory"
              name="subcategory"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
              className="form-input"
            >
              <option value="">Select a subcategory</option>
              {subCategories?.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {formik.touched.subcategory && formik.errors.subcategory && (
              <div className="text-red-500">{formik.errors.subcategory}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter Your Product Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="form-input"
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500">{formik.errors.location}</div>
            )}
          </div>
        </div>

        {/* Line 4 */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label htmlFor="expire" className="block font-medium text-gray-700">
              Expire News (Optional)
            </label>
            <input
              id="expire"
              name="expire"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.expire}
              className="form-input"
            />
            {formik.touched.expire && formik.errors.expire && (
              <div className="text-red-500">{formik.errors.expire}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="youtubeurl"
              className="block font-medium text-gray-700"
            >
              YouTube Url (Optional)
            </label>
            <input
              id="youtubeurl"
              name="youtubeurl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.youtubeurl}
              className="form-input"
            />
            {formik.touched.youtubeurl && formik.errors.youtubeurl && (
              <div className="text-red-500">{formik.errors.youtubeurl}</div>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Upload Images
          </label>
          <div className="bg-white border-2 border-blue-600 p-4">
            <Dropzone onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section className="text-center">
                  <div {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {/* Display Uploaded Images */}
          <div className="flex gap-4 mt-4">
            {images?.map((image, index) => (
              <div key={index} className="relative">
                <button
                  type="button"
                  onClick={() => removeImage(image.public_id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img
                  src={image.url}
                  alt=""
                  className="w-40 h-40 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
           {
            id ? "Update" : " Submit"
           }
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNews;
