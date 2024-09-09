import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditing } from "../../../context/EditingProvider";
import { useTranslation } from "react-i18next";
import { useSelectLanguage } from "../../../context/LanguageChoice";

const PostFields = () => {
  const [posts, setPosts] = useState([]);
  const { isEditing } = useEditing();
  const { selectLanguage } = useSelectLanguage();
  const [formData, setFormData] = useState({
    name: {
      Nepali: "",
      English: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch office posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://ingnepal.org.np/api/office-posts/"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching office posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      name: {
        ...prevData.name,
        [name]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("https://ingnepal.org.np/api/posts/", formData);
      fetchPosts(); // Refresh the list of posts after submission
      setFormData({ name: { Nepali: "", English: "" } });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setIsSubmitting(false);
    }
  };

  // Handle post deletion
  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://ingnepal.org.np/api/posts/${id}/`);
      fetchPosts(); // Refresh the list of posts after deletion
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-8 min-w-96">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-50">
        Posts
      </h1>

      {/* Form to add a new post */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Add New Post
          </h2>
          <div className="mb-4">
            <label htmlFor="Nepali" className="block text-lg font-medium mb-2">
              Nepali Name:
            </label>
            <input
              type="text"
              id="Nepali"
              name="Nepali"
              value={formData.name.Nepali}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name in Nepali"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="English" className="block text-lg font-medium mb-2">
              English Name:
            </label>
            <input
              type="text"
              id="English"
              name="English"
              value={formData.name.English}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name in English"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ${
              isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Post"}
          </button>
        </form>
      )}

      {/* Display the list of posts */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {post.name[selectLanguage]}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className={`bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg font-bold transition duration-300 ${
                    isDeleting ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostFields;
